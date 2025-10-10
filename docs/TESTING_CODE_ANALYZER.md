# Testing Code Quality Analyzer

This guide covers testing procedures for the enhanced PR review workflow with code quality analysis.

## Quick Start

### Basic Test

Create a test PR with sample code issues:

```bash
# Create test branch
git checkout -b test/analyzer-review

# Add test files with common issues
cat > test-code.js << 'EOF'
// Test JavaScript with issues
var oldVar = 10;
console.log("Debug");
if (value == 10) { }
EOF

cat > test-page.html << 'EOF'
<html>
<body>
    <div class="header">Header</div>
    <img src="logo.png">
</body>
</html>
EOF

# Commit and push
git add test-code.js test-page.html
git commit -m "test: Add files with code quality issues"
git push origin test/analyzer-review

# Create PR
gh pr create --title "Test: Code Quality Analyzer" --body "Testing automated review"
```

### Expected Output

The workflow should post a comment with suggestions like:

```markdown
### 🔍 Code Quality Suggestions

#### 📜 test-code.js
- 💡 **info** | **Development Code**: Consider removing console.log statements before production
- ⚠️ **warning** | **Modern JavaScript**: Use 'let' or 'const' instead of 'var' for better scoping
- ⚠️ **warning** | **Type Safety**: Use strict equality (===) instead of loose equality (==)

#### 🌐 test-page.html
- 🚨 **error** | **Accessibility**: Images should have alt attributes for screen readers
- 💡 **info** | **Semantic HTML**: Consider using semantic HTML5 elements
```

## Local Testing

### Test Analyzer Script Directly

```bash
# Create a test diff
cat > /tmp/test-diff.txt << 'EOF'
diff --git a/test.js b/test.js
new file mode 100644
index 0000000..1234567
--- /dev/null
+++ b/test.js
@@ -0,0 +1,3 @@
+var x = 10;
+console.log(x);
+if (x == 10) { }
EOF

# Run analyzer
.github/scripts/code-analyzer.sh /tmp/test-diff.txt /tmp/output.md

# View results
cat /tmp/output.md
```

### Test Performance

```bash
# Time the analyzer
time .github/scripts/code-analyzer.sh /tmp/test-diff.txt /tmp/output.md

# Should complete in < 1 second
```

### Test Different File Types

```bash
# JavaScript
echo "diff --git a/test.js b/test.js
new file mode 100644
--- /dev/null
+++ b/test.js
@@ -0,0 +1,2 @@
+var test = 1;
+console.log('test');" | .github/scripts/code-analyzer.sh /dev/stdin /tmp/js-test.md

# HTML
echo "diff --git a/test.html b/test.html
new file mode 100644
--- /dev/null
+++ b/test.html
@@ -0,0 +1,2 @@
+<img src='test.png'>
+<div class='header'>Test</div>" | .github/scripts/code-analyzer.sh /dev/stdin /tmp/html-test.md

# CSS
echo "diff --git a/test.css b/test.css
new file mode 100644
--- /dev/null
+++ b/test.css
@@ -0,0 +1,3 @@
+.test {
+    float: left;
+    font-size: 16px;
+}" | .github/scripts/code-analyzer.sh /dev/stdin /tmp/css-test.md
```

## Workflow Testing

### Test Workflow Manually

```bash
# Trigger workflow with custom parameters
gh workflow run copilot-pr-review.yml \
  -f enable_code_analysis=true \
  -f max_suggestions_per_file=10
```

### Monitor Workflow Execution

1. Go to **Actions** tab in GitHub
2. Select **Copilot PR Review** workflow
3. View the latest run
4. Check each step:
   - ✅ Checkout code
   - ✅ Get PR diff
   - ✅ Run Code Quality Analyzer
   - ✅ Generate AI Review Summary
   - ✅ Post Review Comment

### Check Workflow Logs

```bash
# List recent workflow runs
gh run list --workflow=copilot-pr-review.yml

# View logs for specific run
gh run view <RUN_ID> --log
```

## Test Scenarios

### Scenario 1: JavaScript Issues

**Test File**: `test.js`
```javascript
var oldStyle = true;
console.log("Debug message");
if (value == null) {
    setTimeout(function() {
        console.log("Timer");
    }, 1000);
}
```

**Expected Suggestions**:
- ⚠️ Use 'let' or 'const' instead of 'var'
- 💡 Remove console.log statements
- ⚠️ Use strict equality (===)
- 💡 Consider cleaning up timers

### Scenario 2: HTML Accessibility

**Test File**: `test.html`
```html
<div class="header">
    <img src="logo.png">
    <div class="nav">
        <a href="#">Link</a>
    </div>
</div>
```

**Expected Suggestions**:
- 🚨 Images should have alt attributes
- 💡 Use semantic HTML5 elements (<header>, <nav>)
- 💡 Consider adding loading='lazy' to images
- 💡 Add aria-label attributes to links

### Scenario 3: CSS Modern Practices

**Test File**: `test.css`
```css
.container {
    float: left !important;
    font-size: 16px;
}

@keyframes slide {
    from { left: 0; }
    to { left: 100%; }
}
```

**Expected Suggestions**:
- ⚠️ Avoid using !important
- 💡 Use relative units (rem, em) for font-size
- 💡 Use Flexbox or Grid instead of float
- ⚠️ Add @media (prefers-reduced-motion)

### Scenario 4: Security Issues

**Test File**: `_config.yml`
```yaml
title: My Site
api_key: sk_live_1234567890abcdefghijklmnop
secret_token: super_secret_password_123
```

**Expected Suggestions**:
- 🚨 Never commit secrets or API keys

**Test File**: `.github/workflows/test.yml`
```yaml
- uses: actions/checkout@main
  with:
    permissions: write-all
```

**Expected Suggestions**:
- ⚠️ Pin actions to specific versions
- 🚨 Avoid 'write-all' permissions

## Verification Checklist

After running tests, verify:

- [ ] Workflow completes within 30 seconds
- [ ] Comment appears on PR automatically
- [ ] Suggestions are relevant to changed files
- [ ] Severity levels are appropriate
- [ ] Documentation links are included
- [ ] Multiple file types are analyzed correctly
- [ ] No false positives on intentional patterns
- [ ] Max suggestions limit is respected
- [ ] No errors in workflow logs

## Performance Benchmarks

| Scenario | Files | Lines | Time | Suggestions |
|----------|-------|-------|------|-------------|
| Small PR | 1-3 | 10-50 | < 1s | 3-10 |
| Medium PR | 4-10 | 51-200 | < 5s | 10-30 |
| Large PR | 11-50 | 201-1000 | < 15s | 30-100 |
| Very Large | 51+ | 1000+ | < 30s | 100+ |

## Troubleshooting

### Analyzer Not Running

**Issue**: No code quality suggestions appear in PR comment

**Solutions**:
1. Check workflow logs for errors
2. Verify analyzer script is executable: `chmod +x .github/scripts/code-analyzer.sh`
3. Check if `enable_code_analysis` is set to false
4. Verify diff file is not empty

### Incorrect Suggestions

**Issue**: Analyzer suggests improvements for intentional code

**Solutions**:
1. Review the pattern matching in analyzer script
2. Add exceptions for specific patterns
3. Adjust severity levels if needed
4. Consider increasing MAX_SUGGESTIONS_PER_FILE

### Performance Issues

**Issue**: Workflow takes longer than expected

**Solutions**:
1. Check PR size (number of files and lines)
2. Review GitHub Actions runner status
3. Optimize analyzer patterns if needed
4. Consider adding file size limits

### Missing File Types

**Issue**: Some file types not analyzed

**Solutions**:
1. Check if file extension is supported in `analyze_file()` function
2. Add new analyzer function for unsupported type
3. Verify files are not in excluded directories (_site, node_modules, etc.)

## Cleanup

```bash
# Delete test branch
git push origin --delete test/analyzer-review

# Close test PR
gh pr close <PR_NUMBER> --delete-branch

# Remove local test files
rm -f test-code.js test-page.html /tmp/test-diff.txt /tmp/output.md
```

## Continuous Testing

Consider adding automated tests to your CI:

```yaml
# .github/workflows/test-analyzer.yml
name: Test Code Analyzer

on:
  push:
    paths:
      - '.github/scripts/code-analyzer.sh'
      - '.github/workflows/copilot-pr-review.yml'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Test Analyzer
        run: |
          # Create test diff
          cat > test-diff.txt << 'EOF'
          diff --git a/test.js b/test.js
          +var x = 10;
          +console.log(x);
          EOF
          
          # Run analyzer
          .github/scripts/code-analyzer.sh test-diff.txt output.md
          
          # Verify output
          grep -q "console.log" output.md || exit 1
          grep -q "var" output.md || exit 1
```

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Bash Testing Guide](https://www.gnu.org/software/bash/manual/bash.html)
- [Main Testing Guide](TESTING_PR_REVIEW.md)

---

*Last Updated: October 2025*  
*For questions, open an issue or contact @jharter1*
