# PHP Mastery — Arrays & Strings

An interactive, slide-based PHP learning course covering **Module 7: Arrays** and **Module 8: String Functions** with live code execution, OOP examples, quizzes, and 150+ code examples.

## Features

- **20 Interactive Slides** — Navigate through structured lessons
- **Live PHP Execution** — Run code directly in the browser
- **150+ Code Examples** — From basics to advanced patterns
- **OOP Integration** — Classes, encapsulation, and fluent interfaces
- **25-Question Quiz** — Test your knowledge with instant feedback
- **Dark Theme UI** — Modern, responsive design

## Topics Covered

### Module 7: PHP Arrays
- Indexed Arrays
- Associative Arrays
- Multidimensional Arrays
- Array Functions (`sort`, `filter`, `map`, `reduce`, `merge`, `slice`)
- OOP with Arrays (ShoppingCart, Library, DataTable)

### Module 8: String Functions
- `strlen()` — String length
- `strpos()` / `stripos()` — Find position
- `substr()` — Extract substring
- `str_replace()` — Replace text
- `explode()` — Split string to array
- `implode()` — Join array to string
- OOP with Strings (TextProcessor, HtmlBuilder, EmailBuilder)

## Project Structure

```
├── index.html      # Main slide UI (20 slides)
├── exec.php        # PHP code executor (backend)
├── script.js       # Navigation, examples, and quiz logic
├── style.css       # Dark theme styling
└── .gitignore
```

## Requirements

- **PHP 8.0+** (with `eval()` enabled for demo purposes)
- A local server (XAMPP, Laragon, PHP built-in server)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/peaceemmieinnovations/learnphp-array-and-string.git
   ```

2. Place the project in your web server directory (e.g., `htdocs` for XAMPP)

3. Start your PHP server and open `index.html` in a browser

4. Or use PHP's built-in server:
   ```bash
   php -S localhost:8000
   ```

5. Navigate to `http://localhost:8000`

## How It Works

- Each slide contains a **code editor** and **output panel**
- Write or edit PHP code, then click **Run** to execute
- Click **Next Example** to cycle through pre-built examples
- Navigate slides with **Previous/Next** buttons or the dot indicators
- Complete the **quiz** on slide 19 to test your knowledge

## Security Note

> The `exec.php` file uses `eval()` for demonstration purposes. **Do not deploy this to production** without proper sandboxing (e.g., using Docker, PHP-FPM pools, or a dedicated sandboxing library).

## License

MIT
