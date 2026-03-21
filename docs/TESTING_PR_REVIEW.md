# Testing the Automated PR Review Workflow

This guide explains how to test and verify the automated PR review workflow is working correctly.

## Prerequisites

- Access to the GitHub repository
- Permissions to create branches and pull requests
- GitHub CLI installed (for local testing)

## Testing Methods

### Method 1: Create a Test Pull Request

This is the most reliable way to test the workflow end-to-end.

#### Steps:

1. **Create a test branch**
   ```bash
   git checkout -b test/pr-review-workflow
   ```

2. **Make a small change**
   ```bash
   # Edit a documentation file or add a comment
   echo "# Test change" >> docs/TEST.md
   git add docs/TEST.md
   git commit -m "test: verify automated PR review workflow"
   ```

3. **Push the branch**
   ```bash
   git push origin test/pr-review-workflow
   ```

4. **Create a pull request**
   - Go to the repository on GitHub
   - Click "Compare & pull request"
   - Add a title and description
   - Click "Create pull request"

5. **Verify the workflow runs**
   - Go to the "Actions" tab
   - Find the "Copilot PR Review" workflow run
   - Verify it completes successfully
   - Check the PR for the automated review comment

6. **Expected Result**
   Within 30-60 seconds, you should see:
   - ✅ A workflow run in the Actions tab
   - ✅ An automated review comment on the PR
   - ✅ Optional: An "automated-review" label on the PR

### Method 2: Trigger on Existing PR

If there's an existing open PR, you can trigger the workflow by:

1. **Pushing a new commit**
   ```bash
   git commit --allow-empty -m "test: trigger workflow"
   git push
   ```

2. **Closing and reopening the PR**
   - Close the PR on GitHub
   - Reopen it
   - The workflow should trigger

### Method 3: Manual Workflow Testing (Local)

Test the workflow logic locally without creating a PR:

```bash
# 1. Install GitHub CLI if not already installed
# See: https://cli.github.com/manual/installation

# 2. Authenticate
gh auth login

# 3. Test fetching a PR diff (replace PR_NUMBER)
gh pr diff PR_NUMBER

# 4. Test posting a comment (CAUTION: This posts to the actual PR)
echo "Test comment" > /tmp/comment.md
gh pr comment PR_NUMBER --body-file /tmp/comment.md
```

## Verification Checklist

When testing, verify the following:

- [ ] Workflow appears in Actions tab
- [ ] Workflow completes within 60 seconds
- [ ] No errors in workflow logs
- [ ] PR receives an automated comment
- [ ] Comment includes:
  - [ ] Summary section
  - [ ] Recommendations checklist
  - [ ] Next steps guidance
  - [ ] Resource links
- [ ] Label added (if repository has "automated-review" label)
- [ ] Workflow doesn't fail if label doesn't exist

## Troubleshooting Common Issues

### Workflow Doesn't Run

**Possible Causes:**
1. Workflow file not in correct location
2. YAML syntax error
3. Actions disabled in repository settings

**Solutions:**
```bash
# Verify file location
ls -la .github/workflows/copilot-pr-review.yml

# Validate YAML syntax
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/copilot-pr-review.yml'))"

# Check repository settings
# Go to Settings > Actions > General
# Ensure "Allow all actions and reusable workflows" is selected
```

### Workflow Runs But Doesn't Comment

**Possible Causes:**
1. Insufficient permissions
2. GitHub token issues
3. PR has no changes

**Solutions:**
```bash
# Check workflow permissions in the YAML file
grep -A 3 "permissions:" .github/workflows/copilot-pr-review.yml

# Verify PR has changes
gh pr diff PR_NUMBER

# Check workflow logs for errors
# Go to Actions > Failed workflow run > View logs
```

### "Permission denied" Errors

**Solutions:**
1. Verify repository settings allow Actions to comment
   - Settings > Actions > General
   - Workflow permissions: "Read and write permissions"
2. Check the workflow permissions section includes:
   ```yaml
   permissions:
     contents: read
     pull-requests: write
     issues: write
   ```

## Monitoring Workflow Health

### Regular Checks

1. **Weekly Review**
   - Check recent workflow runs in Actions tab
   - Verify success rate is above 95%
   - Review any failed runs

2. **Monthly Audit**
   - Review feedback from team members
   - Check if review template needs updates
   - Verify workflow execution times

### Metrics to Track

- **Success Rate**: Percentage of successful runs
- **Execution Time**: Average time from trigger to completion
- **Comment Quality**: Developer feedback on usefulness
- **False Positives**: Issues incorrectly flagged

## Testing Different PR Scenarios

### Scenario 1: Code Changes
```bash
# Modify JavaScript file
echo "console.log('test');" >> assets/js/script.js
git add assets/js/script.js
git commit -m "test: add console log"
```

### Scenario 2: Documentation Changes
```bash
# Modify README
echo "## Test Section" >> README.md
git add README.md
git commit -m "docs: test documentation change"
```

### Scenario 3: Multiple File Changes
```bash
# Change multiple files
echo "test" >> file1.md
echo "test" >> file2.md
git add file1.md file2.md
git commit -m "test: multiple file changes"
```

### Scenario 4: Large PR (100+ changes)
```bash
# Create a large change
for i in {1..150}; do
  echo "Line $i" >> large-file.txt
done
git add large-file.txt
git commit -m "test: large PR"
```

## Automated Testing

Consider adding these tests to your CI:

```yaml
# Example: Workflow validation test
name: Validate Workflows

on:
  pull_request:
    paths:
      - '.github/workflows/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate YAML
        run: |
          for file in .github/workflows/*.yml; do
            python3 -c "import yaml; yaml.safe_load(open('$file'))"
          done
```

## Clean Up After Testing

After testing, clean up test resources:

```bash
# Delete test branch
git push origin --delete test/pr-review-workflow

# Close and delete test PR (via GitHub web UI)
# Or use GitHub CLI:
gh pr close PR_NUMBER --delete-branch
```

## Performance Benchmarks

Expected performance metrics:

| Metric | Target | Acceptable Range |
|--------|--------|------------------|
| Execution Time | 20-30s | 10-60s |
| Success Rate | 100% | >95% |
| Comment Delay | <30s | <60s |
| Resource Usage | Minimal | <100MB RAM |

## Getting Help

If you encounter issues:

1. **Check workflow logs**
   - Actions tab > Workflow run > View logs

2. **Review documentation**
   - [AUTOMATED_PR_REVIEW.md](AUTOMATED_PR_REVIEW.md)
   - [COPILOT_REVIEW_WORKFLOW.md](COPILOT_REVIEW_WORKFLOW.md)

3. **Open an issue**
   - Include workflow run URL
   - Attach relevant logs
   - Describe expected vs. actual behavior

## Advanced Testing

### Test Workflow Conditions

Test the conditional logic:

```bash
# Test with empty PR (should skip review generation)
git commit --allow-empty -m "test: empty commit"
git push

# Test with specific file types
echo "test" >> styles.css
git add styles.css
git commit -m "test: CSS change"
git push
```

### Load Testing

Test workflow under load:

1. Create multiple PRs simultaneously
2. Push to multiple PRs at once
3. Verify all workflows complete successfully
4. Check for rate limiting issues

### Security Testing

Verify security controls:

1. Test with untrusted user (fork PR)
2. Verify workflow permissions are minimal
3. Check no secrets are exposed in logs
4. Validate token scope is appropriate

---

*Last Updated: October 2025*  
*For questions, open an issue or contact @jharter1*
