// ========== SLIDE NAVIGATION ==========
const TOTAL_SLIDES = 20;
let current = 0;

function buildDots() {
   const c = document.getElementById("dotsContainer");
   c.innerHTML = "";
   for (let i = 0; i < TOTAL_SLIDES; i++) {
      const d = document.createElement("button");
      d.className = "dot" + (i === current ? " active" : (i < current ? " visited" : ""));
      d.onclick = () => goTo(i);
      c.appendChild(d);
   }
}

function updateHeader() {
   const badges = ["", "m7", "m7", "m7", "m7", "m7", "m7", "m7", "oop", "m8", "m8", "m8", "m8", "m8", "m8", "m8", "m8", "oop", "quiz", "done"];
   const labels = ["", "MODULE 7", "MODULE 7", "MODULE 7", "MODULE 7", "MODULE 7", "MODULE 7", "MODULE 7", "OOP", "MODULE 8", "MODULE 8", "MODULE 8", "MODULE 8", "MODULE 8", "MODULE 8", "MODULE 8", "MODULE 8", "OOP", "QUIZ", "DONE"];
   const idx = Math.min(current + 1, badges.length - 1);
   document.getElementById("hdrBadge").className = "badge badge-" + (badges[idx] || "m7");
   document.getElementById("hdrBadge").textContent = labels[idx] || "";
   document.getElementById("slideNum").textContent = (current + 1) + " / " + TOTAL_SLIDES;
   document.getElementById("gProg").style.width = (((current + 1) / TOTAL_SLIDES) * 100) + "%";
}

function goTo(n) {
   document.getElementById("s" + (current + 1)).classList.remove("active");
   current = Math.max(0, Math.min(n, TOTAL_SLIDES - 1));
   document.getElementById("s" + (current + 1)).classList.add("active");
   document.getElementById("vp").scrollTop = 0;
   document.getElementById("prevBtn").disabled = (current === 0);
   document.getElementById("nextBtn").disabled = (current === TOTAL_SLIDES - 1);
   buildDots();
   updateHeader();
   if (current === 18) renderQuestion(); // quiz is slide 19 (index 18)
}

function navigate(d) { goTo(current + d); }

buildDots();
updateHeader();
document.getElementById("prevBtn").disabled = true;

// ========== PHP EXECUTION ==========
async function runCode(taId, outId, labelId) {
   const code = document.getElementById(taId).value.trim();
   const out = document.getElementById(outId);
   const lbl = document.getElementById(labelId);
   if (!code) {
      out.className = "op-content err"; out.textContent = "Please enter PHP code.";
      lbl.className = "op-label err"; lbl.textContent = "No code"; return;
   }
   out.className = "op-content wait"; out.textContent = "⏳ Running...";
   lbl.className = "op-label running"; lbl.textContent = "Running...";
   try {
      const res = await fetch("exec.php", {
         method: "POST",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: "code=" + encodeURIComponent(code)
      });
      const text = await res.text();
      if (text.startsWith("ERROR:")) {
         out.className = "op-content err"; out.textContent = text.substring(6);
         lbl.className = "op-label err"; lbl.textContent = "Error";
      } else {
         out.className = "op-content"; out.textContent = text || "(no output)";
         lbl.className = "op-label success"; lbl.textContent = "Output";
      }
   } catch (e) {
      out.className = "op-content err"; out.textContent = "Server error: " + e.message;
      lbl.className = "op-label err"; lbl.textContent = "Error";
   }
}

// ========== EXAMPLE DATA (WITH FIXED </script> ESCAPING) ==========
const exExamples = {
   indexed: {
      idx: 0, items: [
         { title: "📊 Student Grades Management", code: `<?php\n$grades = [95,87,72,88,91,65,98];\necho "Total Students: " . count($grades) . "\\n";\necho "Average: " . round(array_sum($grades)/count($grades),2) . "\\n";\nsort($grades);\necho "Sorted: " . implode(", ", $grades);`, expl: "<strong>📘 What it does:</strong> Creates an indexed array of grades. <code>count()</code> gives total, <code>array_sum()/count()</code> calculates average, <code>sort()</code> reorders, <code>implode()</code> displays as comma-separated. <strong>Key Concept:</strong> Indexed arrays start at index 0 and use numeric keys automatically assigned." },
         { title: "🛒 Shopping Cart - Add/Remove Items", code: `<?php\n$cart = ["Apple","Banana","Orange"];\necho "Initial: " . implode(", ", $cart) . "\\n";\narray_push($cart,"Mango","Grape");\necho "After push: " . implode(", ", $cart) . "\\n";\n$removed = array_shift($cart);\necho "Removed: $removed\\nRemaining: " . implode(", ", $cart);`, expl: "<strong>🛍️ How it works:</strong> <code>array_push()</code> adds elements to the END, <code>array_shift()</code> removes from FRONT – simulates a queue (FIFO - First In First Out)." },
         { title: "🔢 Finding Values & Positions", code: `<?php\n$colors = ["red","blue","green","yellow","red"];\necho "Red at: " . array_search("red", $colors) . "\\n";\necho "Contains green: " . (in_array("green", $colors) ? "Yes" : "No") . "\\n";\necho "All indices: " . implode(", ", array_keys(array_flip($colors)));`, expl: "<strong>🎯 Search Operations:</strong> <code>array_search()</code> finds the key/index, <code>in_array()</code> checks existence. Use these to validate or locate data." },
         { title: "📈 Statistics - Min, Max, Sum", code: `<?php\n$sales = [150,320,45,890,210,670];\necho "Total Sales: $" . array_sum($sales) . "\\n";\necho "Best Sale: $" . max($sales) . "\\n";\necho "Worst Sale: $" . min($sales) . "\\n";\necho "Count: " . count($sales) . " transactions";`, expl: "<strong>💰 Aggregation:</strong> Use <code>array_sum()</code>, <code>max()</code>, <code>min()</code>, <code>count()</code> for data analysis. Perfect for reports and dashboards." },
         { title: "🔀 Reverse & Unique Values", code: `<?php\n$items = [1,2,3,2,4,1,5];\n$unique = array_unique($items);\necho "Unique: " . implode(", ", $unique) . "\\n";\n$reversed = array_reverse($unique);\necho "Reversed: " . implode(", ", $reversed);`, expl: "<strong>🔄 Array Transformation:</strong> <code>array_unique()</code> removes duplicates, <code>array_reverse()</code> flips order. Useful for cleaning data and changing display order." },
         { title: "📊 Advanced Stats - array_count_values", code: `<?php\n$votes = ["PHP","JavaScript","PHP","Python","PHP","JavaScript"];\n$freq = array_count_values($votes);\nforeach($freq as $lang => $count) {\n  echo "$lang: $count\\n";\n}`, expl: "<strong>📊 Frequency Count:</strong> <code>array_count_values()</code> returns an associative array showing how many times each value appears." },
         { title: "🔗 Merging Two Indexed Arrays", code: `<?php\n$front = ["a","b","c"];\n$back = ["d","e","f"];\n$merged = array_merge($front, $back);\necho "Merged: " . implode(", ", $merged) . "\\n";\n$mergedWithSpread = [...$front, ...$back];\necho "Spread: " . implode(", ", $mergedWithSpread);`, expl: "<strong>🔗 Merging:</strong> <code>array_merge()</code> combines two arrays. The spread operator <code>...</code> also works for array unpacking." }
      ]
   },
   assoc: {
      idx: 0, items: [
         { title: "👨‍🎓 Student Profile - Key-Value Pairs", code: `<?php\n$student = ["name"=>"Alice","age"=>20,"gpa"=>3.8,"major"=>"Computer Science"];\necho "Name: " . $student["name"] . "\\n";\necho "GPA: " . $student["gpa"] . "\\n";\nforeach($student as $key => $value) {\n  echo "$key: $value\\n";\n}`, expl: "<strong>📖 How Associative Arrays Work:</strong> Instead of numeric indices [0,1,2...], use meaningful string keys. Access with <code>$array['key']</code>. Loop with <code>foreach($arr as $key=>$value)</code>." },
         { title: "🌍 Country Data - Real World Example", code: `<?php\n$country = ["name"=>"Nigeria","capital"=>"Abuja","population"=>220000000,"continent"=>"Africa"];\necho "{$country['capital']} is the capital of {$country['name']}\\n";\necho "Located in: " . $country["continent"]\\n";\necho "Population: " . number_format($country["population"]);`, expl: "<strong>🗺️ Real-World Use:</strong> Store related data together. String interpolation with <code>\"text {$arr['key']} text\"</code> makes cleaner output." },
         { title: "🔧 Modifying & Adding Keys", code: `<?php\n$config = ["host"=>"localhost","port"=>3306,"user"=>"admin"];\necho "Before: " . json_encode($config) . "\\n";\n$config["password"] = "secret123";  // Add\n$config["port"] = 3307;  // Modify\nunset($config["user"]);  // Delete\necho "After: " . json_encode($config);`, expl: "<strong>✏️ Modify Arrays:</strong> Assign to add/change: <code>$arr['key'] = value</code>. Use <code>unset()</code> to delete. Use <code>json_encode()</code> to debug array contents." },
         { title: "🔍 Sorting Associative Arrays", code: `<?php\n$scores = ["alice"=>95,"bob"=>87,"charlie"=>92,"diana"=>88];\nasort($scores);  // Sort by value, keep keys\necho "Sorted values: " . json_encode($scores) . "\\n";\nksort($scores);  // Sort by key\necho "Sorted keys: " . json_encode($scores);`, expl: "<strong>📊 Sorting Methods:</strong> <code>asort()</code> sorts by VALUE keeping keys, <code>ksort()</code> sorts by KEY. Opposite: <code>arsort()</code>, <code>krsort()</code> for descending." },
         { title: "🔑 Working with Keys & Values", code: `<?php\n$user = ["id"=>1001,"username"=>"alice_wonder","email"=>"alice@example.com"];\necho "Keys: " . implode(", ", array_keys($user)) . "\\n";\necho "Values: " . implode(", ", array_values($user)) . "\\n";\nif (array_key_exists("email", $user)) echo "Email exists in array\\n";`, expl: "<strong>🔑 Key Functions:</strong> <code>array_keys()</code> gets all keys, <code>array_values()</code> gets all values, <code>array_key_exists()</code> checks if key exists." },
         { title: "⚡ Adding Default Values", code: `<?php\n$config = ["host"=>"localhost"];\n$defaults = ["host"=>"127.0.0.1","port"=>3306,"user"=>"root"];\n$final = array_merge($defaults, $config);\necho "Config: " . json_encode($final, JSON_PRETTY_PRINT);`, expl: "<strong>⚡ Defaults Pattern:</strong> Use <code>array_merge()</code> to provide default values; passed array overrides defaults." },
         { title: "🔗 Extracting Keys Dynamically", code: `<?php\n$data = ["first_name"=>"John","last_name"=>"Doe","email"=>"john@example.com"];\n$keys = array_keys($data);\n$values = array_values($data);\n$combined = array_combine($keys, $values);\necho "Keys: " . implode(", ", $keys) . "\\n";\necho "Combined: " . json_encode($combined);`, expl: "<strong>🔗 Dynamic Key/Value Manipulation:</strong> <code>array_combine()</code> creates a new associative array from two indexed arrays." }
      ]
   },
   multi: {
      idx: 0, items: [
         { title: "🏫 2D Array - Class Roster", code: `<?php\n$classroom = [\n  ["name"=>"Alice","score"=>92],\n  ["name"=>"Bob","score"=>78],\n  ["name"=>"Charlie","score"=>85]\n];\nforeach($classroom as $student) {\n  echo "{$student['name']}: {$student['score']}%\\n";\n}\n$grades = array_column($classroom, "score");\necho "Average: " . round(array_sum($grades)/count($grades), 2);`, expl: "<strong>📚 2D Arrays Explained:</strong> Array of associative arrays - each element is itself an array. Access nested values: <code>$arr[0]['key']</code>. Use <code>array_column()</code> to extract single column." },
         { title: "📍 3D Array - Store Hierarchy", code: `<?php\n$company = [\n  "sales" => [\n    ["id"=>1,"name"=>"John","salary"=>50000],\n    ["id"=>2,"name"=>"Jane","salary"=>55000]\n  ],\n  "it" => [\n    ["id"=>3,"name"=>"Mike","salary"=>70000]\n  ]\n];\necho "Sales team first employee: " . $company["sales"][0]["name"] . "\\n";\necho "IT department employee salary: $" . $company["it"][0]["salary"];`, expl: "<strong>🏢 3D Arrays:</strong> Arrays inside arrays inside arrays. Access with <code>$arr['key1'][0]['key2']</code>. Build hierarchical data like org charts, catalogs, menus." },
         { title: "🎮 Game Board - Numeric Multidimensional", code: `<?php\n$board = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n];\necho "3x3 Grid:\\n";\nfor ($i = 0; $i < 3; $i++) {\n  for ($j = 0; $j < 3; $j++) {\n    echo $board[$i][$j] . " ";\n  }\n  echo "\\n";\n}`, expl: "<strong>🎯 Nested Loops:</strong> Use two <code>for</code> loops for 2D grids. Access with <code>$board[row][col]</code>. Useful for matrices, game boards, image pixels." },
         { title: "📦 Product Inventory System", code: `<?php\n$inventory = [\n  ["product"=>"Laptop","price"=>1200,"qty"=>5],\n  ["product"=>"Phone","price"=>800,"qty"=>15],\n  ["product"=>"Tablet","price"=>500,"qty"=>8]\n];\n$total_value = 0;\nforeach($inventory as $item) {\n  $value = $item["price"] * $item["qty"];\n  echo $item["product"] . ": $" . $value . "\\n";\n  $total_value += $value;\n}\necho "Total Inventory Value: $" . $total_value;`, expl: "<strong>💼 Business Logic:</strong> Combine 2D arrays with calculations to build real systems. Loop and calculate totals, filter, or transform data." },
         { title: "🔗 Merging & Processing Multi-level Data", code: `<?php\n$data = [\n  ["id"=>1,"tags"=>["php","web"]],\n  ["id"=>2,"tags"=>["python","ai"]],\n  ["id"=>3,"tags"=>["php","laravel"]]\n];\nforeach($data as $item) {\n  echo "ID {$item['id']}: " . implode(", ", $item["tags"]) . "\\n";\n}`, expl: "<strong>🏷️ Complex Structures:</strong> Mix different data types - strings, numbers, and arrays in one structure. Process with nested loops and functions." },
         { title: "🧮 Matrix Addition", code: `<?php\n$a = [[1,2],[3,4]];\n$b = [[5,6],[7,8]];\n$result = [];\nfor ($i=0; $i<2; $i++) {\n  for ($j=0; $j<2; $j++) {\n    $result[$i][$j] = $a[$i][$j] + $b[$i][$j];\n  }\n}\necho "Sum: " . json_encode($result);`, expl: "<strong>🧮 Matrix Operations:</strong> Loop through each cell to perform calculations – useful for image processing, spreadsheets, or grid-based data." },
         { title: "🌳 Tree-like Structure", code: `<?php\n$categories = [\n  ["name"=>"Electronics","sub"=>[["name"=>"Laptops"],["name"=>"Phones"]]],\n  ["name"=>"Clothing","sub"=>[["name"=>"Men"],["name"=>"Women"]]]\n];\nforeach ($categories as $cat) {\n  echo $cat['name'] . ": ";\n  foreach ($cat['sub'] as $sub) echo $sub['name'] . " ";\n  echo "\\n";\n}`, expl: "<strong>🌳 Nested Structures:</strong> Arrays can represent tree-like data (categories, menus, etc.). Use nested loops to traverse." }
      ]
   },
   af1: {
      idx: 0, items: [
         { title: "📦 Stack & Queue Operations", code: `<?php\n// Queue: FIFO (First In First Out)\n$queue = [];\narray_push($queue,"Customer A","Customer B","Customer C");\necho "Queue: " . implode(", ", $queue) . "\\n";\n$first = array_shift($queue);\necho "Served: $first\\n";\necho "Remaining: " . implode(", ", $queue) . "\\n\\n";\n// Stack: LIFO (Last In First Out)\n$stack = ["Book 1","Book 2","Book 3"];\necho "Stack: " . implode(", ", $stack) . "\\n";\n$top = array_pop($stack);\necho "Removed: $top\\n";\necho "Remaining: " . implode(", ", $stack);`, expl: "<strong>⚙️ Data Structures:</strong> <code>array_push()</code> + <code>array_shift()</code> = Queue. <code>array_push()</code> + <code>array_pop()</code> = Stack. These patterns are crucial for algorithms and system design." },
         { title: "🔢 Sorting Arrays - Multiple Methods", code: `<?php\n$numbers = [64,34,25,12,22,11,90];\nsort($numbers);\necho "Ascending: " . implode(", ", $numbers) . "\\n";\nrsort($numbers);\necho "Descending: " . implode(", ", $numbers);`, expl: "<strong>📊 Sort Functions:</strong> <code>sort()</code> ascending, <code>rsort()</code> descending. They modify the original array." },
         { title: "➕ Adding & Removing Elements", code: `<?php\n$items = ["banana","apple"];\narray_push($items,"cherry");\necho "After push: " . implode(", ", $items) . "\\n";\narray_unshift($items,"orange");\necho "After unshift: " . implode(", ", $items) . "\\n";\n$last = array_pop($items);\necho "Popped: $last, Remaining: " . implode(", ", $items) . "\\n";\n$first = array_shift($items);\necho "Shifted: $first, Remaining: " . implode(", ", $items);`, expl: "<strong>✏️ Modifying Arrays:</strong> <code>array_push()</code>/<code>array_pop()</code> affect END. <code>array_unshift()</code>/<code>array_shift()</code> affect START. All modify original array." },
         { title: "🔍 Finding Min, Max, Sum & Count", code: `<?php\n$sales = [250,180,420,95,310,505,220];\necho "Total: $" . array_sum($sales) . "\\n";\necho "Highest: $" . max($sales) . "\\n";\necho "Lowest: $" . min($sales) . "\\n";\necho "Average: $" . round(array_sum($sales)/count($sales), 2);`, expl: "<strong>💰 Aggregation Functions:</strong> <code>array_sum()</code>, <code>max()</code>, <code>min()</code>, <code>count()</code> are essential for statistics and reporting." },
         { title: "🔄 Merging & Slicing Arrays", code: `<?php\n$team1 = ["Alice","Bob"];\n$team2 = ["Charlie","Diana"];\n$all = array_merge($team1, $team2);\necho "Merged: " . implode(", ", $all) . "\\n";\n$slice = array_slice($all, 1, 2);\necho "Slice: " . implode(", ", $slice);`, expl: "<strong>🔗 Array Combinations:</strong> <code>array_merge()</code> combines arrays. <code>array_slice()</code> extracts a portion without modifying the original." },
         { title: "🔢 Random Selection", code: `<?php\n$deck = ["A♠","K♠","Q♠","J♠","10♠"];\n$hand = array_rand($deck, 2);\nforeach ($hand as $index) echo $deck[$index] . "\\n";`, expl: "<strong>🃏 Random Selection:</strong> <code>array_rand()</code> returns random keys from the array. Useful for games, quizzes, and random sampling." },
         { title: "📋 Array Fill & Range", code: `<?php\n$nums = range(1, 10);\n$even = range(0, 20, 2);\necho "Nums: " . implode(", ", $nums) . "\\n";\necho "Even: " . implode(", ", $even) . "\\n";\n$filled = array_fill(0, 5, "PHP");\nprint_r($filled);`, expl: "<strong>📋 Utility Functions:</strong> <code>range()</code> creates an array of values. <code>array_fill()</code> fills an array with a repeated value." }
      ]
   },
   af2: {
      idx: 0, items: [
         { title: "🔍 Filter - Keep Matching Elements", code: `<?php\n$numbers = [1,2,3,4,5,6,7,8,9,10];\n$evens = array_filter($numbers, function($n) { return $n % 2 == 0; });\necho "Even: " . implode(", ", $evens) . "\\n";\n$gt5 = array_filter($numbers, function($n) { return $n > 5; });\necho "> 5: " . implode(", ", $gt5);`, expl: "<strong>🎯 Filtering Explained:</strong> <code>array_filter()</code> keeps elements WHERE callback returns true. Perfect for validation, searching, cleaning data. Preserves keys." },
         { title: "🔄 Map - Transform Each Element", code: `<?php\n$numbers = [1,2,3,4,5];\n$squares = array_map(function($n) { return $n * $n; }, $numbers);\necho "Squared: " . implode(", ", $squares) . "\\n";\n$transformed = array_map(fn($n) => ($n * 2) + 10, $numbers);\necho "Transform: " . implode(", ", $transformed);`, expl: "<strong>🔀 Mapping Explained:</strong> <code>array_map()</code> applies callback to EACH element, returns new array. Arrow functions <code>fn($x) => expression</code> are cleaner syntax." },
         { title: "📊 Reduce - Calculate Single Value", code: `<?php\n$numbers = [10,20,30,40,50];\n$sum = array_reduce($numbers, function($carry, $item) { return $carry + $item; }, 0);\necho "Sum: $sum\\n";\n$product = array_reduce($numbers, fn($c,$i) => $c * $i, 1);\necho "Product: $product";`, expl: "<strong>➕ Reduce Explained:</strong> <code>array_reduce()</code> processes array to single value. <code>$carry</code> = accumulator, <code>$item</code> = current element. Use for sum, product, building strings, etc." },
         { title: "🔎 Search & In_array - Finding Data", code: `<?php\n$fruits = ["apple","banana","cherry","date"];\nif (in_array("banana", $fruits)) echo "✓ Banana found!\\n";\n$pos = array_search("cherry", $fruits);\necho "Cherry at index: $pos\\n";`, expl: "<strong>🔍 Search Functions:</strong> <code>in_array()</code> returns true/false. <code>array_search()</code> returns key or false." },
         { title: "🏆 Combining Operations", code: `<?php\n$students = [\n  ["name"=>"Alice","score"=>92],\n  ["name"=>"Bob","score"=>45],\n  ["name"=>"Charlie","score"=>88]\n];\n$passing = array_filter($students, fn($s) => $s["score"] > 70);\n$names = array_map(fn($s) => $s["name"], $passing);\necho "Passed: " . implode(", ", $names) . "\\n";\n$scores = array_column($students, "score");\necho "Class average: " . round(array_sum($scores)/count($scores), 2);`, expl: "<strong>💡 Advanced Patterns:</strong> Chain operations: filter → map → transform. Use <code>array_column()</code> to extract field from 2D array. Functional programming style." },
         { title: "🔀 Custom Sorting with usort", code: `<?php\n$data = [["name"=>"Alice","age"=>25],["name"=>"Bob","age"=>20],["name"=>"Charlie","age"=>30]];\nusort($data, fn($a,$b) => $a["age"] <=> $b["age"]);\necho "Sorted by age: " . json_encode($data) . "\\n";`, expl: "<strong>🔀 Custom Sorting:</strong> <code>usort()</code> sorts an array using a user-defined comparison function. The spaceship operator <code><=></code> is handy." },
         { title: "🧩 Group By with array_reduce", code: `<?php\n$orders = [["product"=>"Phone","qty"=>2],["product"=>"Laptop","qty"=>1],["product"=>"Phone","qty"=>3]];\n$grouped = array_reduce($orders, function($carry, $item) {\n  $carry[$item["product"]] = ($carry[$item["product"]] ?? 0) + $item["qty"];\n  return $carry;\n}, []);\necho "Grouped: " . json_encode($grouped);`, expl: "<strong>🧩 Group By:</strong> Use <code>array_reduce()</code> to group and aggregate data. Common in reports and analytics." }
      ]
   },
   oop1: {
      idx: 0, items: [
         { title: "🛍️ ShoppingCart Class - Encapsulation", code: `<?php\nclass Cart {\n  private array $items = [];\n  public function add(string $name, float $price): static {\n    $this->items[] = ['name'=>$name,'price'=>$price];\n    return $this;\n  }\n  public function total(): float {\n    return array_sum(array_map(fn($i)=>$i['price'], $this->items));\n  }\n}\n$cart = new Cart();\n$cart->add("Laptop",1200)->add("Mouse",25)->add("Keyboard",75);\necho "Total: $" . $cart->total();`, expl: "<strong>🧩 OOP Patterns:</strong> Private array $items cannot be modified directly - controlled via methods. Method chaining (return $this) allows fluent interface." },
         { title: "📚 Library Management System", code: `<?php\nclass Library {\n  private array $books = [];\n  public function addBook(array $book): void { $this->books[] = $book; }\n  public function borrowBook(int $id): string {\n    foreach($this->books as &$book) {\n      if ($book['id'] === $id && $book['available']) {\n        $book['available'] = false;\n        return "Borrowed: " . $book['title'];\n      }\n    }\n    return "Not available";\n  }\n}\n$lib = new Library();\n$lib->addBook(['id'=>1,'title'=>'PHP Guide','author'=>'John','available'=>true]);\necho $lib->borrowBook(1);`, expl: "<strong>📖 Business Logic:</strong> Class manages collection of arrays. Use <code>&$book</code> to modify array element by reference." },
         { title: "🏠 Real Estate Property Manager", code: `<?php\nclass PropertyManager {\n  private array $properties = [];\n  public function addProperty(array $prop): static {\n    $prop['dateAdded'] = date('Y-m-d');\n    $this->properties[] = $prop;\n    return $this;\n  }\n  public function filterByPrice(float $min, float $max): array {\n    return array_filter($this->properties, fn($p) => $p['price'] >= $min && $p['price'] <= $max);\n  }\n}\n$mgr = new PropertyManager();\n$mgr->addProperty(['address'=>'123 Main','price'=>250000])->addProperty(['address'=>'456 Oak','price'=>320000]);\necho "3BR homes: " . count($mgr->filterByPrice(200000, 300000));`, expl: "<strong>🏢 Real-world Application:</strong> Combine filtering, aggregation, date handling. Method chaining for cleaner code." },
         { title: "👥 User Management - Advanced OOP", code: `<?php\nclass UserManager {\n  private array $users = [];\n  private int $nextId = 1;\n  public function createUser(string $name, string $email): static {\n    $this->users[] = ['id'=>$this->nextId++,'name'=>$name,'email'=>$email];\n    return $this;\n  }\n  public function findById(int $id): ?array {\n    $found = array_filter($this->users, fn($u) => $u['id'] === $id);\n    return array_shift($found) ?? null;\n  }\n}\n$um = new UserManager();\n$um->createUser('Alice','alice@test.com')->createUser('Bob','bob@test.com');\necho "User names: " . implode(', ', array_column($um->users, 'name'));`, expl: "<strong>👥 Auto-increment Pattern:</strong> Simulate database with auto-incrementing IDs. Use <code>findById()</code> to search." },
         { title: "🎮 Game Inventory System", code: `<?php\nclass Inventory {\n  private array $items = [];\n  public function addItem(string $name, int $qty, float $weight): static {\n    $this->items[] = compact('name','qty','weight');\n    return $this;\n  }\n  public function getTotalWeight(): float {\n    return array_sum(array_map(fn($i) => $i['weight'] * $i['qty'], $this->items));\n  }\n}\n$inv = new Inventory();\n$inv->addItem('Sword',1,2.5)->addItem('Shield',1,3.0);\necho "Total weight: " . $inv->getTotalWeight() . " kg";`, expl: "<strong>🎮 Game Logic:</strong> Complex calculations on array data. Use <code>compact()</code> to create array from variables." },
         { title: "🗂️ DataTable Class", code: `<?php\nclass DataTable {\n  private array $rows = [];\n  public function addRow(array $row): static { $this->rows[] = $row; return $this; }\n  public function getColumn(string $col): array { return array_column($this->rows, $col); }\n  public function count(): int { return count($this->rows); }\n}\n$dt = new DataTable();\n$dt->addRow(['name'=>'Alice','score'=>95])->addRow(['name'=>'Bob','score'=>87]);\necho "Names: " . implode(', ', $dt->getColumn('name'));`, expl: "<strong>🗂️ DataTable Pattern:</strong> Encapsulate tabular data. Useful for building table components." },
         { title: "📊 Statistics Calculator", code: `<?php\nclass Stats {\n  private array $data = [];\n  public function __construct(array $data) { $this->data = $data; }\n  public function mean(): float { return count($this->data) ? array_sum($this->data)/count($this->data) : 0; }\n  public function max(): float { return max($this->data); }\n  public function min(): float { return min($this->data); }\n}\n$stats = new Stats([45,67,89,23,56]);\necho "Mean: " . $stats->mean() . ", Max: " . $stats->max();`, expl: "<strong>📊 Stats Class:</strong> Encapsulate statistical operations for reuse." }
      ]
   },
   strlen: {
      idx: 0, items: [
         { title: "🔐 Password Strength Validator", code: `<?php\n$pwd = "MyPass123";\nif (strlen($pwd) < 8) echo "Too short";\nelseif (strlen($pwd) > 128) echo "Too long";\nelse echo "✓ Strong password";`, expl: "<strong>🔐 Validation Pattern:</strong> <code>strlen()</code> gets length, use with regex for complexity checking." },
         { title: "📝 Text Truncation with Ellipsis", code: `<?php\nfunction truncate(string $text, int $limit = 50): string {\n  return strlen($text) > $limit ? substr($text, 0, $limit) . "..." : $text;\n}\necho truncate("The quick brown fox jumps over the lazy dog", 20);`, expl: "<strong>📏 Truncation:</strong> Check length with <code>strlen()</code>, use <code>substr()</code> to extract portion." },
         { title: "🔤 Character Counting Analysis", code: `<?php\n$text = "Hello World";\n$len = strlen($text);\n$words = str_word_count($text);\necho "Length: $len, Words: $words";`, expl: "<strong>📊 Text Analysis:</strong> Combine <code>strlen()</code> and <code>str_word_count()</code>." },
         { title: "💬 Message Length Checker for APIs", code: `<?php\n$msg = "Hi";\n$valid = strlen($msg) >= 2 && strlen($msg) <= 280;\necho $valid ? "Valid" : "Invalid";`, expl: "<strong>💬 Form Validation:</strong> Check length for social media posts, SMS, chat messages." },
         { title: "🎯 String Padding & Formatting", code: `<?php\n$username = "alice";\necho str_pad($username, 15, ".", STR_PAD_RIGHT) . "\\n";\necho str_pad("42", 5, "0", STR_PAD_LEFT);`, expl: "<strong>🎨 Formatting:</strong> <code>str_pad()</code> pads strings for tables, data alignment, zero-padding numbers." },
         { title: "🔐 Password Strength with Regex", code: `<?php\n$pwd = "MyPass123!";\n$len = strlen($pwd);\n$hasUpper = preg_match('/[A-Z]/', $pwd);\n$hasLower = preg_match('/[a-z]/', $pwd);\n$hasDigit = preg_match('/[0-9]/', $pwd);\necho ($len >= 8 && $hasUpper && $hasLower && $hasDigit) ? "Strong" : "Weak";`, expl: "<strong>🔐 Enhanced Validation:</strong> Combine <code>strlen()</code> with regex for robust checks." },
         { title: "📧 Email Length Validation", code: `<?php\n$email = "user@example.com";\necho (strlen($email) > 0 && strlen($email) < 255) ? "Valid length" : "Invalid";`, expl: "<strong>📧 Email Length:</strong> Emails have a maximum length of 254 characters (RFC 5321)." }
      ]
   },
   strpos: {
      idx: 0, items: [
         { title: "🔎 Find Substring Position", code: `<?php\n$text = "The quick brown fox";\n$pos = strpos($text, "brown");\nif ($pos !== false) echo "Found at $pos";`, expl: "<strong>⚠️ Critical:</strong> Always use <code>!== false</code> because 0 is a valid position." },
         { title: "✉️ Email Validation with strpos", code: `<?php\n$email = "john@example.com";\n$at = strpos($email, "@");\n$dot = strrpos($email, ".");\nif ($at !== false && $dot !== false && $at > 0 && $dot > $at) echo "Valid";`, expl: "<strong>📧 Email Parsing:</strong> Find @ symbol with <code>strpos()</code>, find last . with <code>strrpos()</code>." },
         { title: "🔍 Search & Replace Using strpos", code: `<?php\nfunction replaceFirst($search, $replace, $subject) {\n  $pos = strpos($subject, $search);\n  if ($pos !== false) return substr($subject, 0, $pos) . $replace . substr($subject, $pos + strlen($search));\n  return $subject;\n}\necho replaceFirst("PHP", "Python", "PHP is great. PHP rocks.");`, expl: "<strong>🔄 Manual Replace:</strong> Find position with <code>strpos()</code>, extract parts with <code>substr()</code>." },
         { title: "🌐 URL Parsing & Validation", code: `<?php\n$url = "https://example.com/page";\n$start = strpos($url, "://") + 3;\n$end = strpos($url, "/", $start);\n$domain = substr($url, $start, $end - $start);\necho $domain;`, expl: "<strong>🌐 URL Processing:</strong> Use strpos() to find markers like '://' and '/'." },
         { title: "🏷️ Tag & Hashtag Extraction", code: `<?php\n$tweet = "I love #PHP and #WebDevelopment";\n$tags = [];\n$pos = 0;\nwhile (($pos = strpos($tweet, "#", $pos)) !== false) {\n  $pos++;\n  $end = strpos($tweet, " ", $pos);\n  if ($end === false) $end = strlen($tweet);\n  $tags[] = substr($tweet, $pos - 1, $end - $pos + 1);\n  $pos = $end;\n}\nprint_r($tags);`, expl: "<strong>🏷️ Pattern Extraction:</strong> Loop with strpos() to find all occurrences. Essential for parsing social media." },
         { title: "🔍 str_contains (PHP 8)", code: `<?php\n$haystack = "Hello world";\nif (str_contains($haystack, "world")) echo "Found!";`, expl: "<strong>🔍 PHP 8:</strong> <code>str_contains()</code> is a cleaner alternative to <code>strpos() !== false</code>." },
         { title: "📱 Extract Domain from Email", code: `<?php\n$email = "user@subdomain.example.com";\n$at = strpos($email, "@");\n$domain = substr($email, $at + 1);\necho $domain;`, expl: "<strong>📱 Quick Domain Extraction:</strong> Simple use of <code>strpos()</code> and <code>substr()</code>." }
      ]
   },
   substr: {
      idx: 0, items: [
         { title: "✂️ Extract Substring - Basics", code: `<?php\n$str = "Hello World PHP";\necho substr($str, 0, 5) . "\\n";   // Hello\necho substr($str, 6) . "\\n";      // World PHP\necho substr($str, -3) . "\\n";     // PHP`, expl: "<strong>✂️ Syntax:</strong> <code>substr(string, start, length)</code>. Negative start counts from the end." },
         { title: "🎬 Video Timestamp Extraction", code: `<?php\n$filename = "movie_2024-01-15_1920x1080.mp4";\n$dateStart = strpos($filename, "_") + 1;\n$dateEnd = strpos($filename, "_", $dateStart);\n$date = substr($filename, $dateStart, $dateEnd - $dateStart);\necho "Date: $date";`, expl: "<strong>📹 File Parsing:</strong> Combine strpos()/strrpos() to find markers, use substr() to extract sections." },
         { title: "🔐 Mask Sensitive Data", code: `<?php\n$card = "1234567890123456";\necho str_repeat("*", strlen($card) - 4) . substr($card, -4);`, expl: "<strong>🔒 Security:</strong> Use substr() to hide most characters. Keep first and last for recognition." },
         { title: "🌍 Phone Number Formatting", code: `<?php\n$phone = "2025551234";\n$area = substr($phone, 0, 3);\n$exchange = substr($phone, 3, 3);\n$number = substr($phone, 6, 4);\necho "($area) $exchange-$number";`, expl: "<strong>📱 Formatting:</strong> Extract parts with fixed lengths using substr(). Reconstruct with formatting." },
         { title: "🎨 Color Code Parsing", code: `<?php\n$hex = "#FF5733";\n$hex = ltrim($hex, "#");\n$r = hexdec(substr($hex, 0, 2));\n$g = hexdec(substr($hex, 2, 2));\n$b = hexdec(substr($hex, 4, 2));\necho "rgb($r,$g,$b)";`, expl: "<strong>🎨 Binary Data:</strong> Use substr() to extract 2-char chunks. Convert from hex with hexdec()." },
         { title: "✂️ Truncate with HTML Tags Preservation", code: `<?php\nfunction truncateHtml($html, $length) {\n  $text = strip_tags($html);\n  return strlen($text) > $length ? substr($text, 0, $length) . "..." : $text;\n}\necho truncateHtml("<p>Hello <b>world</b></p>", 8);`, expl: "<strong>✂️ Truncation with HTML:</strong> Use <code>strip_tags()</code> first, then truncate." },
         { title: "🔀 Extract Filename without Extension", code: `<?php\n$file = "document.pdf";\n$name = substr($file, 0, strrpos($file, "."));\necho $name;`, expl: "<strong>🔀 Filename Handling:</strong> Find the last dot with <code>strrpos()</code>, then extract before it." }
      ]
   },
   strreplace: {
      idx: 0, items: [
         { title: "🔄 Basic String Replacement", code: `<?php\n$text = "I like PHP and Python and JavaScript";\necho str_replace("and", "or", $text, $count);\necho "\\nCount: $count";`, expl: "<strong>🔄 Syntax:</strong> <code>str_replace(search, replace, subject)</code> replaces ALL occurrences. <code>str_ireplace()</code> ignores case." },
         { title: "📧 Template Engine", code: `<?php\n$template = "Hello {{name}}! Welcome to {{company}}.";\n$data = ["{{name}}"=>"Alice","{{company}}"=>"TechCorp"];\necho str_replace(array_keys($data), array_values($data), $template);`, expl: "<strong>📧 Template Pattern:</strong> Use array form to replace multiple placeholders at once." },
         { title: "🧹 Text Cleaning & Sanitization", code: `<?php\nfunction cleanUserInput(string $input): string {\n  $bad = ["<script>", "<\\/script>", "onclick=", "SELECT", "DROP"];\n  $clean = str_ireplace($bad, "", $input);\n  while (strpos($clean, "  ") !== false) {\n    $clean = str_replace("  ", " ", $clean);\n  }\n  return trim($clean);\n}\n\n$input = "<script>xss<\\/script> Hello";\necho cleanUserInput($input);`, expl: "<strong>🧹 Security:</strong> Use str_ireplace() to remove dangerous patterns. Basic sanitization (use htmlspecialchars() for production)." },
         { title: "🌍 Localization - Multi-language", code: `<?php\n$texts = ["Hello"=>"Hola","Goodbye"=>"Adiós"];\n$message = "Hello! Goodbye!";\necho str_replace(array_keys($texts), array_values($texts), $message);`, expl: "<strong>🌍 Localization:</strong> Map language keys to translations. Use str_replace() with arrays to translate entire text at once." },
         { title: "📝 Markdown to HTML (simple)", code: `<?php\nfunction markdownToHtml($md) {\n  $md = str_replace("**", "<strong>", $md);\n  $md = str_replace("**", "</strong>", $md);\n  return $md;\n}\necho markdownToHtml("This is **bold** text.");`, expl: "<strong>📝 Simple Markdown:</strong> Multiple passes with str_replace() can convert basic markdown to HTML." },
         { title: "🔄 Replace with Callback (preg_replace_callback)", code: `<?php\n$text = "Today is 2024-01-15";\n$new = preg_replace_callback('/\\d{4}-\\d{2}-\\d{2}/', function($m) {\n  return date("M d, Y", strtotime($m[0]));\n}, $text);\necho $new;`, expl: "<strong>🔄 Advanced Replacement:</strong> When you need logic in replacements, use <code>preg_replace_callback()</code>." },
         { title: "🧹 Remove Extra Spaces", code: `<?php\n$text = "Too   many    spaces";\n$text = preg_replace('/\\s+/', ' ', trim($text));\necho $text;`, expl: "<strong>🧹 Space Cleanup:</strong> Use regex <code>preg_replace()</code> to collapse multiple spaces into one." }
      ]
   },
   explode: {
      idx: 0, items: [
         { title: "📂 Split CSV String", code: `<?php\n$csv = "apple,banana,cherry";\n$fruits = explode(",", $csv);\necho "Count: " . count($fruits) . "\\n";\nprint_r($fruits);`, expl: "<strong>📎 CSV Parsing:</strong> <code>explode(delimiter, string)</code> splits a string into an array." },
         { title: "🏷️ Tag System", code: `<?php\n$tagString = "php,web,development";\n$tags = explode(",", $tagString);\nforeach ($tags as $tag) echo trim($tag) . "\\n";`, expl: "<strong>🏷️ Tag Management:</strong> Store tags as comma-separated string, explode to array for processing." },
         { title: "📍 Path/URL Parsing", code: `<?php\n$url = "https://example.com/products/electronics/laptops";\n$path = parse_url($url, PHP_URL_PATH);\n$segments = array_filter(explode("/", $path));\necho "Segments: " . implode(" > ", $segments);`, expl: "<strong>📍 URL Segments:</strong> Use <code>parse_url()</code> to extract path, then explode by '/'. Filter empty strings." },
         { title: "⏰ Date/Time Parsing", code: `<?php\n$dateString = "2024-01-15 14:30:45";\nlist($date, $time) = explode(" ", $dateString);\nlist($year, $month, $day) = explode("-", $date);\necho "Day: $day, Month: $month, Year: $year";`, expl: "<strong>⏰ Date Parsing:</strong> explode() on space and dash to extract components. Use list() for unpacking." },
         { title: "🔐 Email Domain Extraction", code: `<?php\n$email = "john.doe@example.com";\nlist($user, $domain) = explode("@", $email, 2);\necho "User: $user\\nDomain: $domain";`, expl: "<strong>📧 Email Parsing:</strong> Use limit parameter <code>explode('@', email, 2)</code> to split into username + domain." },
         { title: "📜 Reading CSV Lines", code: `<?php\n$csvData = "name,age,city\\nAlice,30,NYC\\nBob,25,LA";\n$lines = explode("\\n", $csvData);\nforeach ($lines as $line) {\n  $fields = explode(",", $line);\n  echo implode(" | ", $fields) . "\\n";\n}`, expl: "<strong>📜 Multi-line CSV:</strong> First explode by newline, then by comma. Basic CSV parsing." },
         { title: "🔗 Query String Parsing", code: `<?php\n$query = "page=1&sort=asc&limit=10";\nparse_str($query, $params);\necho "Page: " . ($params['page'] ?? 'none');`, expl: "<strong>🔗 Query String:</strong> <code>parse_str()</code> handles query strings more robustly than explode." }
      ]
   },
   implode: {
      idx: 0, items: [
         { title: "🔗 Join Array to CSV", code: `<?php\n$items = ["apple","banana","cherry"];\necho implode(",", $items);`, expl: "<strong>🔗 Syntax:</strong> <code>implode(separator, array)</code> joins array elements into a string." },
         { title: "🗄️ SQL Query Builder", code: `<?php\n$ids = [1, 5, 12];\n$idList = implode(",", $ids);\necho "SELECT * FROM products WHERE id IN ($idList)";`, expl: "<strong>🗄️ SQL Building:</strong> Use implode() to construct SQL queries. Combine with array_map() to quote strings." },
         { title: "🌐 Build URLs & Query Strings", code: `<?php\n$base = "https://example.com";\n$segments = ["products","electronics","laptops"];\necho $base . "/" . implode("/", $segments);`, expl: "<strong>🌐 URL Building:</strong> Combine path segments with '/' using implode." },
         { title: "📧 Email List from Array", code: `<?php\n$recipients = ["alice@example.com","bob@test.com"];\necho implode(",", $recipients);`, expl: "<strong>📧 Email Headers:</strong> Combine multiple emails with separators for email headers." },
         { title: "📝 Build HTML from Array", code: `<?php\n$items = ["Home","About","Contact"];\n$html = "<ul>\\n<li>" . implode("</li>\\n<li>", $items) . "</li>\\n</ul>";\necho $html;`, expl: "<strong>📝 HTML Generation:</strong> Build HTML lists or tables using implode." },
         { title: "📋 Array to Pipe-delimited String", code: `<?php\n$data = ["John","Doe","30"];\necho implode("|", $data);`, expl: "<strong>📋 Pipe-delimited:</strong> Useful for data exports and log files." },
         { title: "🎯 Combine with array_map for Quoting", code: `<?php\n$names = ["Alice","Bob","Charlie"];\n$quoted = array_map(fn($n) => "'$n'", $names);\necho implode(",", $quoted);`, expl: "<strong>🎯 Quoting for SQL:</strong> Use array_map() then implode to safely build query strings." }
      ]
   },
   oop2: {
      idx: 0, items: [
         { title: "📝 TextProcessor OOP Class", code: `<?php\nclass TextProcessor {\n  private string $text;\n  public function __construct(string $text) { $this->text = $text; }\n  public function truncate(int $length): static {\n    if (strlen($this->text) > $length) $this->text = substr($this->text, 0, $length) . "...";\n    return $this;\n  }\n  public function uppercase(): static { $this->text = strtoupper($this->text); return $this; }\n  public function get(): string { return $this->text; }\n}\necho (new TextProcessor("The quick brown fox"))->truncate(15)->uppercase()->get();`, expl: "<strong>🏗️ Fluent Interface:</strong> Each method returns <code>$this</code> enabling method chaining. Encapsulates string operations." },
         { title: "🎨 HTML Builder Class", code: `<?php\nclass HtmlBuilder {\n  private string $html = "";\n  public function tag(string $name, ?string $content = null): static {\n    $this->html .= "<$name>" . ($content ?? "") . "</$name>\\n";\n    return $this;\n  }\n  public function build(): string { return $this->html; }\n}\necho (new HtmlBuilder())->tag("h1", "Hello")->tag("p", "World")->build();`, expl: "<strong>🎨 DSL Pattern:</strong> Build HTML with fluent chainable methods. Shows how classes can abstract complex string operations." },
         { title: "🔐 Password Hasher & Validator", code: `<?php\nclass PasswordManager {\n  private string $password;\n  public function __construct(string $pwd) { $this->password = $pwd; }\n  public function isValid(): bool {\n    return strlen($this->password) >= 8 && preg_match('/[A-Z]/', $this->password);\n  }\n  public function hash(): string { return password_hash($this->password, PASSWORD_BCRYPT); }\n}\n$pwd = new PasswordManager("MyPass123");\necho $pwd->isValid() ? "Valid" : "Invalid";`, expl: "<strong>🔐 Security Pattern:</strong> Encapsulate validation and hashing. Use built-in password_hash()." },
         { title: "📊 CSV Parser & Transformer", code: `<?php\nclass CsvParser {\n  private array $rows = [];\n  public function __construct(string $csv) {\n    $lines = explode("\\n", trim($csv));\n    $headers = explode(",", array_shift($lines));\n    foreach ($lines as $line) {\n      $values = explode(",", $line);\n      if (count($values) === count($headers)) $this->rows[] = array_combine($headers, array_map('trim', $values));\n    }\n  }\n  public function getRows(): array { return $this->rows; }\n}\n$csv = "name,age\\nAlice,30\\nBob,25";\n$parser = new CsvParser($csv);\nprint_r($parser->getRows());`, expl: "<strong>📊 Data Processing:</strong> Encapsulate CSV parsing logic. Use explode() and array_combine() to create associative arrays." },
         { title: "🔤 String Validator with Multiple Rules", code: `<?php\nclass StringValidator {\n  private array $errors = [];\n  public function __construct(private string $value) {}\n  public function minLength(int $min): static {\n    if (strlen($this->value) < $min) $this->errors[] = "Minimum $min characters";\n    return $this;\n  }\n  public function containsNumber(): static {\n    if (!preg_match('/[0-9]/', $this->value)) $this->errors[] = "Must contain a number";\n    return $this;\n  }\n  public function isValid(): bool { return count($this->errors) === 0; }\n  public function getErrors(): array { return $this->errors; }\n}\n$v = new StringValidator("Test123");\necho $v->minLength(5)->containsNumber()->isValid() ? "Valid" : "Invalid";`, expl: "<strong>✔️ Builder Pattern:</strong> Chain validation methods. Combine string checks with OOP design." },
         { title: "📧 Email Builder", code: `<?php\nclass EmailBuilder {\n  private array $to = [];\n  private string $subject = "";\n  private string $body = "";\n  public function to(string $email): static { $this->to[] = $email; return $this; }\n  public function subject(string $subject): static { $this->subject = $subject; return $this; }\n  public function body(string $body): static { $this->body = $body; return $this; }\n  public function send(): string {\n    $headers = "To: " . implode(",", $this->to);\n    // mail($headers, $this->subject, $this->body);\n    return "Email sent to: " . implode(", ", $this->to);\n  }\n}\necho (new EmailBuilder())->to("alice@test.com")->to("bob@test.com")->subject("Hello")->body("Hi!")->send();`, expl: "<strong>📧 Email Builder:</strong> Fluent interface for constructing emails, using arrays for recipients." },
         { title: "🗃️ Session Manager", code: `<?php\nclass SessionManager {\n  public function set(string $key, $value): void { $_SESSION[$key] = $value; }\n  public function get(string $key, $default = null) { return $_SESSION[$key] ?? $default; }\n  public function has(string $key): bool { return isset($_SESSION[$key]); }\n}\n// Usage: $session = new SessionManager(); $session->set('user', 'Alice'); echo $session->get('user');`, expl: "<strong>🗃️ Session Wrapper:</strong> Encapsulates superglobal array access for cleaner code." }
      ]
   },
   // ----- SLIDE 17: COMBINED PROJECT -----
   combo: {
      idx: 0, items: [
         { title: "📬 Contact Form Processor", code: `<?php\n$formData = [\n  'name' => 'Alice',\n  'email' => 'alice@example.com',\n  'message' => 'I love PHP!'\n];\n\n// Validate email\nif (!filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {\n  echo "Invalid email.";\n  exit;\n}\n\n// Sanitize message\n$message = htmlspecialchars($formData['message']);\n$message = str_replace(["\r", "\n"], ' ', $message);\n\n// Build email body\n$body = "Name: " . $formData['name'] . "\\nEmail: " . $formData['email'] . "\\nMessage: $message";\n\n// Send email (simulated)\necho "Email sent!\\n$body";`, expl: "<strong>📬 Combined Use:</strong> This example uses associative arrays to hold form data, string functions (<code>filter_var</code>, <code>htmlspecialchars</code>, <code>str_replace</code>) to sanitize and format, and <code>implode</code>-like string building. It demonstrates how arrays and strings work together in a real web application." },
         { title: "🔗 URL Shortener Logic", code: `<?php\n$longUrls = [\n  "https://example.com/page/12345",\n  "https://example.com/page/67890"\n];\n$shortCodes = [];\nforeach ($longUrls as $url) {\n  $hash = substr(md5($url), 0, 6);\n  $shortCodes[$hash] = $url;\n}\necho "Shortened URLs:\\n";\nforeach ($shortCodes as $code => $url) {\n  echo "$code -> $url\\n";\n}`, expl: "<strong>🔗 URL Shortener:</strong> Combines arrays (<code>$longUrls</code>, <code>$shortCodes</code>) with string functions (<code>md5</code>, <code>substr</code>). Great example of data processing with both arrays and strings." },
         { title: "📊 Data Aggregation & Formatting", code: `<?php\n$sales = [\n  ['product'=>'A','amount'=>150],\n  ['product'=>'B','amount'=>200],\n  ['product'=>'A','amount'=>100]\n];\n// Group and sum\n$grouped = [];\nforeach ($sales as $sale) {\n  $grouped[$sale['product']] = ($grouped[$sale['product']] ?? 0) + $sale['amount'];\n}\n// Format output\nforeach ($grouped as $product => $total) {\n  echo ucfirst($product) . ": $" . number_format($total, 2) . "\\n";\n}`, expl: "<strong>📊 Data Pipeline:</strong> Collect data in arrays, process with loops and conditions, then format using <code>number_format</code> and string functions." }
      ]
   },
   // ----- SLIDE 18: DEEP DIVE MULTIDIMENSIONAL ARRAYS -----
   deep: {
      idx: 0, items: [
         { title: "📋 Employee Table with Sorting", code: `<?php\n$employees = [\n  ['name'=>'John','dept'=>'Sales','salary'=>55000],\n  ['name'=>'Jane','dept'=>'IT','salary'=>70000],\n  ['name'=>'Doe','dept'=>'Sales','salary'=>48000],\n  ['name'=>'Smith','dept'=>'IT','salary'=>72000]\n];\n// Sort by salary descending\nusort($employees, fn($a,$b) => $b['salary'] <=> $a['salary']);\n// Display table\necho "Name\\tDept\\tSalary\\n";\necho str_repeat("-", 30) . "\\n";\nforeach ($employees as $emp) {\n  echo $emp['name'] . "\\t" . $emp['dept'] . "\\t$" . number_format($emp['salary']) . "\\n";\n}`, expl: "<strong>📋 Employee Table:</strong> A classic multidimensional array use case. Sort using <code>usort</code> with custom comparison, then iterate to display. Combines arrays, sorting, and string formatting." },
         { title: "🏗️ Dynamic Menu", code: `<?php\n$menu=[['title'=>'Home','url'=>'/'],['title'=>'Products','url'=>'/products','children'=>[['title'=>'Laptops','url'=>'/laptops']]]];\nfunction renderMenu($items){ echo "<ul>\\n"; foreach($items as $item){ echo "<li><a href=\\"{$item['url']}\\">{$item['title']}</a>"; if(isset($item['children'])) renderMenu($item['children']); echo "</li>\\n"; } echo "</ul>\\n"; }\nrenderMenu($menu);`, expl: "<strong>🏗️ Recursive function:</strong> Process nested arrays to build HTML menus." },
         { title: "🧮 Matrix Multiplication", code: `<?php\n$a = [[1,2],[3,4]];\n$b = [[5,6],[7,8]];\n$result = [[0,0],[0,0]];\nfor ($i=0; $i<2; $i++) {\n  for ($j=0; $j<2; $j++) {\n    for ($k=0; $k<2; $k++) {\n      $result[$i][$j] += $a[$i][$k] * $b[$k][$j];\n    }\n  }\n}\necho "Result: " . json_encode($result);`, expl: "<strong>🧮 Matrix Multiplication:</strong> Three nested loops for a classic operation. Important for graphics, data transformations, and scientific computing." }
      ]
   }
};

function nextEx(key, taIds, outIds) {
   const ex = exExamples[key];
   if (!ex) return;
   ex.idx = (ex.idx + 1) % ex.items.length;
   const item = ex.items[ex.idx];
   const titleEl = document.getElementById("et-" + key);
   if (titleEl) titleEl.textContent = item.title;
   taIds.forEach(id => { const ta = document.getElementById(id); if (ta) ta.value = item.code; });
   outIds.forEach(id => {
      const out = document.getElementById(id);
      if (out) { out.className = "op-content wait"; out.textContent = "▶ Click 'Run' to execute PHP..."; }
      const lbl = document.getElementById(id.replace("out-", "ol-"));
      if (lbl) { lbl.className = "op-label"; lbl.textContent = "Output"; }
   });
   const expDiv = document.getElementById("exp-" + key);
   if (expDiv && item.expl) expDiv.innerHTML = item.expl;
}

document.addEventListener("DOMContentLoaded", () => {
   for (let k in exExamples) {
      const expDiv = document.getElementById("exp-" + k);
      if (expDiv && exExamples[k].items[0]?.expl) expDiv.innerHTML = exExamples[k].items[0].expl;
      const ta = document.getElementById("ta-" + k);
      if (ta && exExamples[k].items[0]?.code) ta.value = exExamples[k].items[0].code;
      const titleEl = document.getElementById("et-" + k);
      if (titleEl && exExamples[k].items[0]?.title) titleEl.textContent = exExamples[k].items[0].title;
   }
});

// ========== QUIZ (25 questions) ==========
const quizQuestions = [
   { q: "What index does the FIRST element of a PHP indexed array have?", opts: ["1", "0", "-1", "null"], answer: 1, feedback: "Zero‑based indexing: first element at index 0." },
   { q: "What does this code output? <code>$arr = ['a','b','c','d']; echo count($arr);</code>", opts: ["3", "4", "5", "Error"], answer: 1, feedback: "count() returns 4 elements." },
   { q: "Which function splits a string into an array by a delimiter?", opts: ["implode()", "split_string()", "explode()", "str_split_by()"], answer: 2, feedback: "explode(delimiter, string) splits a string into an array." },
   { q: "What does strpos() return when the needle is NOT found?", opts: ["-1", "0", "null", "false"], answer: 3, feedback: "strpos() returns false. Use !== false to check." },
   { q: "What does strlen('Hello World') return?", opts: ["10", "11", "12", "Error"], answer: 1, feedback: "11 characters (space counts)." },
   { q: "How to access associative array value with key 'name'?", opts: ["$user[0]", "$user('name')", "$user['name']", "$user->name"], answer: 2, feedback: "Square brackets with quotes." },
   { q: "substr('Hello World',6) returns?", opts: ["Hello", "World", "ello ", "orld"], answer: 1, feedback: "Starts at index 6 = 'World'." },
   { q: "array_pop() does what?", opts: ["removes first", "removes last", "adds to end", "sorts"], answer: 1, feedback: "Removes and returns last element." },
   { q: "str_replace('PHP','Python','I love PHP') returns?", opts: ["I love PHP", "I love Python", "I love", "Python love PHP"], answer: 1, feedback: "Replaces all occurrences." },
   { q: "Returning $this from a method enables what?", opts: ["Inheritance", "Method chaining", "Polymorphism", "Encapsulation"], answer: 1, feedback: "Fluent interface (method chaining)." },
   { q: "Which function returns all keys of an associative array?", opts: ["array_values()", "array_keys()", "get_keys()", "array_index()"], answer: 1, feedback: "array_keys() returns the keys." },
   { q: "explode(',','php,web,oop')[1] outputs?", opts: ["php", "web", "oop", "array"], answer: 1, feedback: "Index 1 is 'web'." },
   { q: "What does array_filter() do?", opts: ["Sorts array", "Keeps matching elements", "Deletes duplicates", "Merges arrays"], answer: 1, feedback: "array_filter() returns new array with elements where callback returns true." },
   { q: "array_map() applies a function to which?", opts: ["First element only", "Last element only", "Each element", "Nothing - just joins"], answer: 2, feedback: "array_map(callback, array) applies callback to EACH element." },
   { q: "What does array_sum([10,20,30]) return?", opts: ["60", "3", "30", "10,20,30"], answer: 0, feedback: "Adds all elements: 10+20+30=60." },
   { q: "strrpos() vs strpos() - what's different?", opts: ["strrpos returns boolean", "strrpos finds last occurrence", "No difference", "strrpos is case-insensitive"], answer: 1, feedback: "strpos() finds first, strrpos() finds LAST occurrence." },
   { q: "Private arrays in OOP classes are protected from?", opts: ["Reading", "Direct modification outside class", "Methods", "Inheritance"], answer: 1, feedback: "private properties can only be accessed within the class." },
   { q: "array_column($data,'id') extracts which?", opts: ["All rows", "Specific column from 2D array", "Single value", "Array keys"], answer: 1, feedback: "Extracts 'id' column from each row in 2D array." },
   { q: "What does array_reverse() do?", opts: ["Reverses keys only", "Flips entire array order", "Removes duplicates", "Sorts descending"], answer: 1, feedback: "Flips array order - first becomes last." },
   { q: "How many parameters does substr() take?", opts: ["1 (required)", "2 (required)", "3 (1 required, 2 optional)", "Unlimited"], answer: 2, feedback: "substr(string, start, length) - only string is required." },
   { q: "What's the difference between asort() and arsort()?", opts: ["No difference", "asort ascending/arsort descending (keep keys)", "asort sorts numbers only", "arsort removes duplicates"], answer: 1, feedback: "Both keep keys - asort ascending, arsort descending." },
   { q: "Which is faster for large arrays?", opts: ["foreach", "array_map()", "array_filter()", "All same speed"], answer: 3, feedback: "Modern PHP optimizes these similarly. Choose based on readability." },
   { q: "What does in_array('needle', $haystack) return?", opts: ["Position", "true/false", "1 or 0", "Index number"], answer: 1, feedback: "Returns boolean: true if found, false if not." },
   { q: "What is the purpose of the <code>compact()</code> function?", opts: ["Creates an array from variables", "Compresses data", "Deletes array", "Sorts array"], answer: 0, feedback: "compact('name', 'age') creates an associative array from variable names." },
   { q: "What does <code>array_rand()</code> return?", opts: ["Random value", "Random key(s)", "Shuffled array", "Random index"], answer: 1, feedback: "Returns one or multiple random keys from the array." }
];
let qCurrent = 0, qScore = 0, qAnswered = false;
function renderQuestion() {
   const q = quizQuestions[qCurrent];
   const area = document.getElementById("quizArea");
   const results = document.getElementById("quizResults");
   results.style.display = "none";
   area.style.display = "block";
   document.getElementById("qCurr").textContent = qCurrent + 1;
   document.getElementById("qTotal").textContent = quizQuestions.length;
   document.getElementById("qProgFill").style.width = ((qCurrent + 1) / quizQuestions.length * 100) + "%";
   const labels = ["A", "B", "C", "D"];
   area.innerHTML = `<div class="q-card"><div class="q-num">Question ${qCurrent + 1}</div><div class="q-text">${q.q}</div><ul class="opts">${q.opts.map((o, i) => `<button class="opt" onclick="answerQ(${i})"><span class="opt-l">${labels[i]}</span>${o}</button>`).join("")}</ul><div class="fb" id="qFeedback"></div></div><div class="q-nav"><span class="q-score">Score: ${qScore}/${quizQuestions.length}</span><button class="nav-btn primary" id="qNextBtn" onclick="nextQuestion()" style="display:none">Next →</button></div>`;
   qAnswered = false;
}
function answerQ(chosen) {
   if (qAnswered) return;
   qAnswered = true;
   const q = quizQuestions[qCurrent];
   const fb = document.getElementById("qFeedback");
   const nextBtn = document.getElementById("qNextBtn");
   const opts = document.querySelectorAll(".opt");
   opts.forEach(b => b.disabled = true);
   if (chosen === q.answer) { qScore++; opts[chosen].classList.add("correct"); fb.className = "fb ok"; fb.textContent = "✓ Correct! " + q.feedback; }
   else { opts[chosen].classList.add("wrong"); opts[q.answer].classList.add("show-correct"); fb.className = "fb fail"; fb.textContent = "✗ Incorrect. " + q.feedback; }
   if (qCurrent < quizQuestions.length - 1) nextBtn.style.display = "inline-flex";
   else nextBtn.style.display = "inline-flex";
}
function nextQuestion() { if (qCurrent < quizQuestions.length - 1) { qCurrent++; renderQuestion(); } else showResults(); }
function showResults() {
   const area = document.getElementById("quizArea");
   const results = document.getElementById("quizResults");
   area.style.display = "none";
   results.style.display = "block";
   const pct = Math.round(qScore / quizQuestions.length * 100);
   document.getElementById("resScore").innerHTML = `${qScore}/${quizQuestions.length}`;
   document.getElementById("rs-correct").innerHTML = qScore;
   document.getElementById("rs-wrong").innerHTML = quizQuestions.length - qScore;
   document.getElementById("rs-pct").innerHTML = pct + "%";
}
function restartQuiz() { qCurrent = 0; qScore = 0; qAnswered = false; document.getElementById("quizResults").style.display = "none"; renderQuestion(); }
window.renderQuestion = renderQuestion; window.answerQ = answerQ; window.nextQuestion = nextQuestion; window.restartQuiz = restartQuiz;