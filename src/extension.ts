// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const quotes = [
  "We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore!",
  "God help us, we're in the hands of engineers.",
  "Forget the fat lady! You're obsessed with the fat lady!",
  'Hey, take a look at the earthlings. Goodbye!',
  'Checkmate...',
  'God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.',
  "You know what? It is beets. I've crashed into a beet truck.",
  "You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager?",
  'Must go faster.',
  'So you two dig up, dig up dinosaurs?',
  'Eventually, you do plan to have dinosaurs on your dinosaur tour, right?',
  'Must go faster... go, go, go, go, go!',
  "Hey, you know how I'm, like. always trying to save the planet? Here's my chance.",
  "My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard!",
  'I was part of something special.',
  'Do you have any idea how long it takes those cups to decompose.',
  'I gave it a cold? I gave it a virus. A computer virus.',
  "Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.",
  'What do they got in there? King Kong?',
  'You really think you can fly that thing?',
  'This thing comes fully loaded. AM/FM radio, reclining bucket seats, and power windows.',
  'Yes, Yes, without the oops!',
  "They're using our own satellites against us. And the clock is ticking.",
  'Just my luck, no ice.',
  'Remind me to thank John for a lovely weekend.',
  'I travel for work, but recently, friends said I should take major trips.',
  'I love to be directed. They can trust me and go.',
  "No matter how you travel, it's still you going.",
  "If any movie people are watching this show, please, for me, have some respect. You wanna sell some tickets, act like you know what you're talking about.",
  "It's mysterious what attracts you to a person.",
  "I, uh, don't think I'm, y'know, so different than your average, y'know, average.",
  "It's a delight to trust somebody so completely.",
  "It's nice to play a character that has a soulful, dependent, close relationship. It must mean my character is interesting in some way.",
];

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "jeffsum-vscode" is now active!'
  );

  //Jeff
  vscode.languages.registerCompletionItemProvider('html', {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken
    ) {
      const linePrefix = document
        .lineAt(position)
        .text.substring(0, position.character);

      const matches = /\b(jeffsum)([0-9]*)/g.exec(linePrefix);
      if (!matches) {
        return undefined;
      }

      let count = 25;
      if (matches[2] !== '') {
        count = parseInt(matches[2]);
      }
      console.log(matches);
      console.log(count);

      let ci = new vscode.CompletionItem(
        matches[0],
        vscode.CompletionItemKind.Text
      );

      let jeffsumText = '';
      let jeffArray: string[] = [];
      Array.from({ length: count }).forEach(() => {
        const randomSentence =
          quotes[Math.floor(Math.random() * quotes.length)];
        jeffArray.push(randomSentence);
        jeffsumText = jeffArray.join(' ');
      });

      const jeffsumWordArray = jeffsumText.split(' ');

      let text = jeffsumWordArray.slice(0, count).join(' ');
      if (/[,-]/g.test(text.slice(-1))) {
        text = text.slice(0, -1) + '.';
      } else if (!/[?.!]/g.test(text.slice(-1))) {
        text += '.';
      }
      ci.detail = 'Jeffsum';
      ci.documentation = text;
      ci.insertText = new vscode.SnippetString(text);

      return [ci];
    },
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
