# 🚀 Proton# Beginner's Guide
### Written for people who have never coded before

---

## What is Proton#?

Proton# (pronounced "Proton Sharp") is a programming language made for creating games.
You write code in `.pros` files and the Proton# editor runs them for you.

Think of code like giving instructions to a computer. You say exactly what you want it to do, step by step.

---

## Step 1 — Install Proton#

1. Go to **protonsharp.com**
2. Click **Download**
3. Check both boxes and click the download button
4. Run the installer and follow the steps
5. Proton# Editor will open automatically when done

---

## Step 2 — Your First Script

Open Proton# Editor. You'll see a blank file called `Untitled.pros`.

Type this exactly:

```
print("Hello, World!");
```

Press **F5** (or click the **▶ Run** button at the top).

A small black window will pop up and show:
```
Hello, World!
```

🎉 You just wrote your first program!

---

## Step 3 — Understanding the Basics

### Printing text
`print` shows text on the screen.
```
print("Whatever you type here shows up!");
print("You can have multiple print lines.");
```

---

### Variables — storing information
A variable is like a labeled box that holds a value.

```
var:local name = "James";
var:local age = 16;
var:local score = 0;

print(name);
print(age);
```

- `var:local` means "create a variable"
- The name you pick (like `name` or `score`) is up to you
- The `=` means "put this value inside the box"

---

### const — values that never change
```
const:local MAX_SCORE = 100;
const:local GAME_NAME = "My Game";
```
Use `const:local` when the value should never change (like a max score or game title).

---

### Math
```
var:local x = 10;
var:local y = 5;

print(x + y);   -- shows 15
print(x - y);   -- shows 5
print(x * y);   -- shows 50
print(x / y);   -- shows 2
```

`--` is how you write a comment — the computer ignores everything after `--` on that line.
Comments are notes for yourself.

---

### if / else — making decisions
```
var:local score = 80;

if score > 50 do
    print("You passed!");
else do
    print("Try again.");
end;
```

Read it like English: "If the score is greater than 50, print You passed. Otherwise print Try again."

- `>` means greater than
- `<` means less than
- `==` means equal to (two equals signs!)
- `!=` means not equal to

---

### Loops — repeating things
```
var:local i = 1;

while i <= 5 do
    print(i);
    i = i + 1;
end;
```

This prints 1, 2, 3, 4, 5.
The loop keeps going as long as `i` is 5 or less.

---

### Functions — reusable instructions
A function is a block of code you can use over and over.

```
func greet(playerName) do
    print("Hello, " .. playerName .. "!");
end;

greet("James");
greet("Alex");
```

The `..` joins two pieces of text together.

Output:
```
Hello, James!
Hello, Alex!
```

---

## Step 4 — Making a Window with UI1

UI1 is Proton#'s window/GUI library. It lets you create actual app windows.

```
import UI1;

UI1.var:local screen = ("My First App", null, 500, 400);
UI1.Func:Draw(screen, false);
UI1.Func:AddLabel(screen, "Welcome to my app!");
UI1.Func:AddButton(screen, "Click Me");
```

- `import UI1` — loads the window library
- `("My First App", null, 500, 400)` — title, no image, 500px wide, 400px tall
- `Draw(screen, false)` — show the window
- `AddLabel` — adds text to the window
- `AddButton` — adds a clickable button

---

## Step 5 — Your First Game Idea

Try building a simple number guessing game:

```
const:local SECRET = 7;

var:local guess = 5;  -- change this number to guess

if guess == SECRET do
    print("You got it!");
else do
    print("Wrong! The number was " .. SECRET);
end;
```

---

## Quick Reference Card

| What you want to do | Code |
|---|---|
| Show text | `print("hello");` |
| Make a variable | `var:local x = 10;` |
| Make a constant | `const:local MAX = 100;` |
| Add a comment | `-- this is a comment` |
| If/else | `if x > 5 do ... else do ... end;` |
| Loop | `while x < 10 do ... end;` |
| Make a function | `func myFunc() do ... end;` |
| Join text | `"Hello " .. name` |
| Create a window | `import UI1;` |

---

## Tips

- **Always end statements with `;`**
- **`end;` closes every `if`, `while`, and `func` block**
- **Save often** — press Ctrl+S
- **Run your code** — press F5
- **If something breaks** — read the red error text in the shell window, it tells you which line has a problem
- **Docs** — click the 📖 Docs button in the editor or go to docs.protonsharp.com

---

## What's Next?

Once you're comfortable with the basics, check out:
- **docs.protonsharp.com** — full language reference
- **module variables** — sharing data across functions with `module.score = 0`
- **events** — running code when things happen with `events.on("Tick", func() do ... end)`
- **datastores** — saving and loading data with `datastore.save` and `datastore.load`

Good luck! 🎮
