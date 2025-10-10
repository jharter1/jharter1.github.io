# Copilot PR Review Workflow - Technical Details

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PR EVENT TRIGGERS                         │
│  • PR Opened    • PR Synchronized    • PR Reopened          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Step 1: Checkout Code                        │
│  Actions: Checkout repository with full history             │
│  Purpose: Access all files and commit history               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Step 2: Get PR Diff                          │
│  Actions: Fetch diff using GitHub CLI                       │
│  Output: pr-diff.txt with all changes                       │
│  Checks: Validates diff is not empty                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           Step 3: Generate AI Review Summary                 │
│  Actions: Create review template with recommendations       │
│  Output: review-output.md formatted review                  │
│  Content: Summary, recommendations, next steps              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Step 4: Post Review Comment                     │
│  Actions: Comment on PR using GitHub CLI                    │
│  Permissions: pull-requests: write                          │
│  Effect: Visible automated review on PR                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Step 5: Update PR with Labels                   │
│  Actions: Add "automated-review" label                      │
│  Permissions: issues: write                                 │
│  Behavior: Continues on error if label doesn't exist        │
└─────────────────────────────────────────────────────────────┘
```

## Conditional Execution

The workflow includes smart conditional execution:

1. **has_changes check**: Skip review if no changes detected
2. **review_created check**: Only post comment if review was generated
3. **continue-on-error**: Label step won't fail the workflow

## Error Handling

```yaml
# Example: Graceful label handling
continue-on-error: true
run: |
  gh pr edit ... --add-label "automated-review" || echo "Label doesn't exist, skipping"
```

## Environment Variables

- `GH_TOKEN`: GitHub token for API access (automatically provided)
- `GITHUB_OUTPUT`: Used for passing data between steps

## Permissions Breakdown

```yaml
permissions:
  contents: read        # Read repository files
  pull-requests: write  # Comment on PRs
  issues: write         # Add labels (PRs are issues)
```

## Future Integration Points

When GitHub releases a Copilot API:

```yaml
# Hypothetical future implementation
- name: Copilot Deep Analysis
  uses: github/copilot-review-action@v1
  with:
    pr-number: ${{ github.event.pull_request.number }}
    analysis-depth: comprehensive
    focus-areas: security, performance, best-practices
```

## Testing the Workflow

### Local Validation
```bash
# Validate YAML syntax
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/copilot-pr-review.yml'))"

# Check GitHub CLI is available
gh --version

# Test PR diff command (requires authenticated gh)
gh pr diff <PR_NUMBER>
```

### Monitoring Workflow Runs
1. Go to repository Actions tab
2. Select "Copilot PR Review" workflow
3. View runs for each PR event
4. Check logs for any errors

## Customization Examples

### Add Code Quality Checks
```yaml
- name: Run Code Quality Tools
  run: |
    # Add linting, testing, etc.
    npm run lint || true
    bundle exec htmlproofer ./_site || true
```

### Custom Review Template
```yaml
- name: Generate AI Review Summary
  run: |
    cat > review-output.md << 'EOF'
    ## Your Custom Review Template
    
    ### Specific Checks
    - [ ] Jekyll builds successfully
    - [ ] No broken links
    - [ ] Responsive design verified
    EOF
```

### Filter by File Types
```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
    paths:
      - '**.html'
      - '**.css'
      - '**.js'
      - '**.yml'
```

## Performance Considerations

- **Execution Time**: Typically 10-30 seconds
- **API Rate Limits**: Uses GITHUB_TOKEN with standard rate limits
- **Concurrency**: No conflicts, each PR runs independently

## Security Notes

- Uses repository-scoped GITHUB_TOKEN
- No external API calls
- All processing happens in GitHub Actions
- No secrets or credentials exposed

---

*This document provides technical details for maintaining and customizing the automated PR review workflow.*
