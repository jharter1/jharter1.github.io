#!/bin/bash
# Code Quality Analyzer for PR Reviews
# Analyzes different file types and provides best-practice suggestions

set -e

# Configuration
DIFF_FILE="${1:-pr-diff.txt}"
OUTPUT_FILE="${2:-analyzer-output.md}"
MAX_SUGGESTIONS_PER_FILE=5

# Color codes for terminal output (won't appear in markdown)
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Severity levels
declare -A SEVERITY_ICONS=(
    ["error"]="🚨"
    ["warning"]="⚠️"
    ["info"]="💡"
)

# Initialize output file
cat > "$OUTPUT_FILE" << 'EOF'
### 🔍 Code Quality Suggestions

EOF

# Track if any suggestions were made
SUGGESTIONS_MADE=false

# Function to add suggestion to output
add_suggestion() {
    local file="$1"
    local severity="$2"
    local category="$3"
    local message="$4"
    local docs_link="$5"
    
    SUGGESTIONS_MADE=true
    
    cat >> "$OUTPUT_FILE" << EOF
- ${SEVERITY_ICONS[$severity]} **$severity** | **$category**: $message
EOF
    
    if [ -n "$docs_link" ]; then
        cat >> "$OUTPUT_FILE" << EOF
  - 📚 [Learn more]($docs_link)
EOF
    fi
}

# Function to analyze JavaScript files
analyze_javascript() {
    local file="$1"
    local content="$2"
    
    echo "#### 📜 $file" >> "$OUTPUT_FILE"
    local suggestions=0
    
    # Check for console.log statements
    if echo "$content" | grep -q "console\.log" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Development Code" "Consider removing console.log statements before production" "https://developer.mozilla.org/en-US/docs/Web/API/Console/log"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for var usage (prefer let/const)
    if echo "$content" | grep -qE "\bvar\s+\w+" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "warning" "Modern JavaScript" "Use 'let' or 'const' instead of 'var' for better scoping" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for == instead of ===
    if echo "$content" | grep -qE " == " && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "warning" "Type Safety" "Use strict equality (===) instead of loose equality (==)" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for setTimeout/setInterval without cleanup
    if echo "$content" | grep -qE "setTimeout|setInterval" && ! echo "$content" | grep -q "clearTimeout\|clearInterval" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Memory Management" "Consider cleaning up timers with clearTimeout/clearInterval to prevent memory leaks" "https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for inline event handlers
    if echo "$content" | grep -qE "onclick|onload|onchange" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Modern Practices" "Consider using addEventListener instead of inline event handlers for better separation of concerns" "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"
        suggestions=$((suggestions + 1))
    fi
    
    # Performance: Check for DOM queries in loops
    if echo "$content" | grep -qE "for.*querySelector|while.*querySelector" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "warning" "Performance" "Cache DOM queries outside loops to improve performance" "https://web.dev/dom-size/"
        suggestions=$((suggestions + 1))
    fi
    
    echo "" >> "$OUTPUT_FILE"
}

# Function to analyze HTML files
analyze_html() {
    local file="$1"
    local content="$2"
    
    echo "#### 🌐 $file" >> "$OUTPUT_FILE"
    local suggestions=0
    
    # Check for missing alt attributes on images
    if echo "$content" | grep -qE "<img[^>]*>" && ! echo "$content" | grep -qE "<img[^>]*alt=" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "error" "Accessibility" "Images should have alt attributes for screen readers" "https://www.w3.org/WAI/tutorials/images/"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for inline styles
    if echo "$content" | grep -qE "style=\"" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Maintainability" "Consider moving inline styles to CSS files for better maintainability" "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for semantic HTML
    if echo "$content" | grep -qE "<div class=\"header\"|<div class=\"nav\"|<div class=\"footer\"" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Semantic HTML" "Consider using semantic HTML5 elements like <header>, <nav>, <footer> instead of divs" "https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for meta description
    if echo "$content" | grep -qE "<head>" && ! echo "$content" | grep -qE "<meta.*description" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "SEO" "Add a meta description for better search engine visibility" "https://developers.google.com/search/docs/appearance/snippet"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for lazy loading on images
    if echo "$content" | grep -qE "<img[^>]*>" && ! echo "$content" | grep -qE "loading=\"lazy\"" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Performance" "Consider adding loading='lazy' to images for better performance" "https://web.dev/browser-level-image-lazy-loading/"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for ARIA labels on buttons/links
    if echo "$content" | grep -qE "<button[^>]*>|<a[^>]*>" && ! echo "$content" | grep -qE "aria-label=" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Accessibility" "Consider adding aria-label attributes to interactive elements for better screen reader support" "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label"
        suggestions=$((suggestions + 1))
    fi
    
    echo "" >> "$OUTPUT_FILE"
}

# Function to analyze CSS files
analyze_css() {
    local file="$1"
    local content="$2"
    
    echo "#### 🎨 $file" >> "$OUTPUT_FILE"
    local suggestions=0
    
    # Check for !important usage
    if echo "$content" | grep -qE "!important" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "warning" "Specificity" "Avoid using !important; it makes CSS harder to maintain and debug" "https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for fixed font sizes (suggest clamp or rem)
    if echo "$content" | grep -qE "font-size:\s*[0-9]+px" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Responsive Design" "Consider using relative units (rem, em) or clamp() for fluid typography" "https://web.dev/responsive-web-design-basics/"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for float usage (suggest flexbox/grid)
    if echo "$content" | grep -qE "float:\s*(left|right)" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Modern CSS" "Consider using Flexbox or CSS Grid instead of float for more maintainable layouts" "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for vendor prefixes without autoprefixer comment
    if echo "$content" | grep -qE "-webkit-|-moz-|-ms-|-o-" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Tooling" "Consider using autoprefixer to automatically manage vendor prefixes" "https://github.com/postcss/autoprefixer"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for magic numbers in media queries
    if echo "$content" | grep -qE "@media.*\([0-9]+px\)" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Maintainability" "Consider using CSS variables for breakpoint values to improve maintainability" "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for animations without reduced motion media query
    if echo "$content" | grep -qE "@keyframes|animation:|transition:" && ! echo "$content" | grep -qE "@media.*prefers-reduced-motion" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "warning" "Accessibility" "Add @media (prefers-reduced-motion) to respect user motion preferences" "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion"
        suggestions=$((suggestions + 1))
    fi
    
    echo "" >> "$OUTPUT_FILE"
}

# Function to analyze Ruby/Jekyll files
analyze_ruby() {
    local file="$1"
    local content="$2"
    
    echo "#### 💎 $file" >> "$OUTPUT_FILE"
    local suggestions=0
    
    # Check for hardcoded URLs (suggest site.url or relative_url)
    if echo "$content" | grep -qE "http://|https://" && ! echo "$content" | grep -qE "site\.url" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "warning" "Jekyll Best Practices" "Use site.url or relative_url filter instead of hardcoded URLs for portability" "https://jekyllrb.com/docs/liquid/filters/"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for missing relative_url filter
    if echo "$content" | grep -qE "href=\"/[^h]" && ! echo "$content" | grep -qE "relative_url" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "info" "Jekyll Best Practices" "Use the relative_url filter for internal links: {{ '/path' | relative_url }}" "https://jekyllrb.com/docs/liquid/filters/"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for raw Liquid output (XSS concern)
    if echo "$content" | grep -qE "{{\s*[^}]*\s*}}" && ! echo "$content" | grep -qE "\| escape" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "warning" "Security" "Consider using the 'escape' filter for user-generated content to prevent XSS" "https://shopify.github.io/liquid/filters/escape/"
        suggestions=$((suggestions + 1))
    fi
    
    echo "" >> "$OUTPUT_FILE"
}

# Function to analyze YAML configuration files
analyze_yaml() {
    local file="$1"
    local content="$2"
    
    echo "#### ⚙️ $file" >> "$OUTPUT_FILE"
    local suggestions=0
    
    # Check for hardcoded secrets
    if echo "$content" | grep -qiE "password|secret|token|api_key" && echo "$content" | grep -qE ":\s*['\"]?[a-zA-Z0-9]{20,}" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "error" "Security" "Never commit secrets or API keys; use environment variables or GitHub Secrets" "https://docs.github.com/en/actions/security-guides/encrypted-secrets"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for missing version pinning in GitHub Actions
    if echo "$file" | grep -qE "workflows/.*\.yml" && echo "$content" | grep -qE "uses:.*@main|uses:.*@master" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "warning" "Security" "Pin GitHub Actions to specific versions (SHA or tag) instead of @main/@master" "https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions"
        suggestions=$((suggestions + 1))
    fi
    
    # Check for overly permissive workflow permissions
    if echo "$content" | grep -qE "permissions:.*write-all" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "error" "Security" "Avoid 'write-all' permissions; specify minimal required permissions" "https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#permissions"
        suggestions=$((suggestions + 1))
    fi
    
    echo "" >> "$OUTPUT_FILE"
}

# Function to analyze JSON files
analyze_json() {
    local file="$1"
    local content="$2"
    
    echo "#### 📋 $file" >> "$OUTPUT_FILE"
    local suggestions=0
    
    # Check for hardcoded secrets in package.json scripts
    if echo "$file" | grep -qE "package\.json" && echo "$content" | grep -qiE "password|secret|token" && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "warning" "Security" "Avoid hardcoding secrets in package.json; use .env files with dotenv" "https://www.npmjs.com/package/dotenv"
        suggestions=$((suggestions + 1))
    fi
    
    # Validate JSON syntax
    if ! echo "$content" | python3 -m json.tool > /dev/null 2>&1 && [ $suggestions -lt $MAX_SUGGESTIONS_PER_FILE ]; then
        add_suggestion "$file" "error" "Syntax" "JSON syntax appears invalid; validate with a JSON linter" "https://jsonlint.com/"
        suggestions=$((suggestions + 1))
    fi
    
    echo "" >> "$OUTPUT_FILE"
}

# Main analysis function
analyze_file() {
    local file="$1"
    local extension="${file##*.}"
    
    # Extract file-specific content from diff
    # Use awk to extract only the lines for this specific file
    local content=$(awk -v file="$file" '
        /^diff --git/ { 
            current_file = ""
        }
        /^\+\+\+ b\// { 
            gsub(/^\+\+\+ b\//, "")
            current_file = $0
        }
        /^+[^+]/ && current_file == file { 
            sub(/^\+/, "")
            print
        }
    ' "$DIFF_FILE" || true)
    
    # Skip if no additions (only deletions)
    if [ -z "$content" ]; then
        return
    fi
    
    case "$extension" in
        js)
            analyze_javascript "$file" "$content"
            ;;
        html|htm)
            analyze_html "$file" "$content"
            ;;
        css)
            analyze_css "$file" "$content"
            ;;
        rb)
            analyze_ruby "$file" "$content"
            ;;
        yml|yaml)
            analyze_yaml "$file" "$content"
            ;;
        json)
            analyze_json "$file" "$content"
            ;;
    esac
}

# Main execution
echo "🔍 Starting code quality analysis..."

# Check if diff file exists
if [ ! -f "$DIFF_FILE" ]; then
    echo "Error: Diff file not found: $DIFF_FILE"
    exit 1
fi

# Get list of changed files from diff
CHANGED_FILES=$(grep "^+++" "$DIFF_FILE" | sed 's|^+++ b/||' || true)

if [ -z "$CHANGED_FILES" ]; then
    echo "No files to analyze"
    cat >> "$OUTPUT_FILE" << 'EOF'
_No specific code quality suggestions for this change._

EOF
    exit 0
fi

# Analyze each changed file
for file in $CHANGED_FILES; do
    # Skip certain files/directories
    if echo "$file" | grep -qE "^(_site|node_modules|vendor|\.git)/"; then
        continue
    fi
    
    # Skip binary files and certain extensions
    if echo "$file" | grep -qE "\.(png|jpg|jpeg|gif|svg|ico|pdf|zip|tar|gz)$"; then
        continue
    fi
    
    echo "Analyzing: $file"
    analyze_file "$file"
done

# Add footer
if [ "$SUGGESTIONS_MADE" = true ]; then
    cat >> "$OUTPUT_FILE" << 'EOF'

---

💡 **Note**: These are automated suggestions based on common best practices. Some may not apply to your specific use case. Use your judgment to determine which suggestions are relevant.

📚 **Resources**:
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev Best Practices](https://web.dev/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)

EOF
else
    cat >> "$OUTPUT_FILE" << 'EOF'
_No specific code quality suggestions for this change. The changes look good from an automated analysis perspective._

EOF
fi

echo "✅ Analysis complete. Results saved to $OUTPUT_FILE"
exit 0
