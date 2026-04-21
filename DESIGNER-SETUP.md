# Setting Up Claude Code + VS Code on Mac
### A guide for designers

## What you'll need
- Mac computer
- Figma account (Dev or Full seat)
- Anthropic account (claude.ai)

---

## Step 1: Install VS Code
VS Code is the app where you'll write prompts, view your files, and run live previews.

**Via terminal:**
```
brew install --cask visual-studio-code
```

**Alternative — download from the website:**
1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Download the Mac version and drag it into your Applications folder

**After installing:**
1. Open VS Code
2. Press **Cmd+Shift+P**, type `shell command`, and select **"Install 'code' command in PATH"**
3. Open the built-in terminal with **Ctrl+`** (backtick, top left of keyboard) — you'll use this for the next few steps

---

## Step 2: Install Homebrew
Homebrew lets you install developer tools quickly from the terminal.

Check if you already have it:
```
brew --version
```
If you see a version number, skip to Step 3. If you see "command not found", install it:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
> **Note:** During installation you may be asked for a password. This is your **Mac login password**. When you type it nothing will appear on screen — no dots or asterisks — but it is registering. Just type your password and press Enter.

After installing, run these two commands to make sure Homebrew is set up in the right place:
```
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```
Then verify it worked:
```
brew --version
```

---

## Step 3: Install Node.js
Node.js is needed behind the scenes to run Claude Code and React projects.

**Via terminal:**
```
brew install node
```

**Alternative — download from the website:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS version** and run the installer

**Verify it worked:**
```
node --version
```
You should see a version number.

---

## Step 4: Install Claude Code
Claude Code is the AI that reads your Figma designs and builds them into code.

**Via terminal:**
```
npm install -g @anthropic-ai/claude-code --registry https://registry.npmjs.org
```

Verify it worked:
```
claude --version
```
> **Note:** If you get an E401 error, your company's network is blocking the install. Try a different network or ask IT to whitelist the package.

---

## Step 5: Install VS Code Extensions
1. Press **Cmd+Shift+X** to open the Extensions panel
2. Search for and install:
   - **Claude Code** by Anthropic
   - **Live Preview** by Microsoft

---

## Step 6: Enable MCP Server in Figma Desktop
1. Open the Figma desktop app and sign in
2. Open any design file
3. Press **Shift+D** to enter Dev Mode
4. In the inspect panel on the right, find the **MCP Server section**
5. Click **"Enable desktop MCP server"**

Keep Figma open while working — the MCP server only runs while the desktop app is active.

---

## Step 7: Connect Figma to Claude
1. Go to [claude.ai](https://claude.ai) and sign in
2. Click your profile icon → **Settings**
3. Go to the **Connectors** tab
4. Find **Figma** and click **Connect**
5. Follow the login flow to authorise Claude to access your Figma account

---

## Step 8: Create a GitHub Account
GitHub is where the prototype project lives. You'll need an account to access it.

1. Go to [github.com](https://github.com) and click **Sign up**
2. Follow the steps to create a free account
3. Once your account is created, send your GitHub username to your team lead so they can add you as a collaborator on the project

You won't be able to access the repo until your team lead has added you, so do this step first and wait for confirmation before continuing.

---

## Step 9: Connect GitHub to Claude
1. Go to [claude.ai](https://claude.ai) and sign in
2. Click your profile icon → **Settings**
3. Go to the **Connectors** tab
4. Find **GitHub** and click **Connect**
5. Follow the login flow to authorise Claude to access your GitHub account

---

## Step 10: Clone the Project in VS Code
Cloning copies the project from GitHub to your Mac so you can work on it locally.

1. Open VS Code
2. Press **Cmd+Shift+P**, type **"Git: Clone"** and select it
3. Paste in the repo URL:
```
https://github.com/BradCarley05/ax-design-prototypes
```
4. Choose a folder to save it in — Documents is fine
5. VS Code will ask if you want to open the cloned folder — click **Open**
6. Open the VS Code terminal with **Ctrl+`** and run:
```
npm install
```
This sets up all the dependencies the project needs. You only need to do this once.

---

## Step 11: Build a Prototype
1. Open Claude Code by clicking the **Claude icon** in the VS Code sidebar or pressing **Cmd+Esc**
2. Use this prompt, and either paste a Figma link at the end or attach a screenshot of your design:
```
Build this Figma design as a React TSX component using the existing components and styles in this project. Follow all rules in ai-instructions.md and use existing components from src/components wherever possible rather than creating new ones. Once the component is built, run it locally with npm run dev so I can preview it in the browser.
```
3. Claude Code will build the component and open a local preview URL — click it to open in your browser
4. Review the prototype and ask Claude to make any changes directly in the chat until it looks right

> **Tip:** To get a Figma link, right-click any frame in Figma → **Copy link to selection** and paste it at the end of the prompt. Or screenshot your design with **Cmd+Shift+4** and drag the image into the Claude Code panel before sending.

---

## Step 12: Share Your Prototype
Once you're happy with the prototype, ask Claude Code to commit and push it to GitHub:
```
Commit and push these changes to the repo with a short descriptive message.
```
Vercel will automatically deploy it within a minute or two. Open the live prototype at:
[ax-design-prototypes-test.vercel.app](https://ax-design-prototypes-test.vercel.app)

---

## Everyday Workflow Summary
Open VS Code, open Claude Code (**Cmd+Esc**), and start with this prompt:
```
Pull the latest changes from the repo and run npm run dev if it isn't already running.
```
Then paste a Figma link or drop in a screenshot and ask Claude to build your prototype.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `claude: command not found` | Re-run the install in Step 4, then restart the terminal |
| `npm run dev` not recognised | Run `npm install` first inside the project folder |
| Figma MCP not connecting | Make sure the desktop app is open and Dev Mode MCP server is enabled in Step 6 |
| Plugin marketplace error | Skip the plugin — the connector method in Step 7 does the same thing |
| E401 error during install | Add `--registry https://registry.npmjs.org` to the command, or try a different network |
| `brew: command not found` | Complete Step 2 to install Homebrew first |
| Can't access the GitHub repo | Make sure your team lead has added you as a collaborator before cloning |
