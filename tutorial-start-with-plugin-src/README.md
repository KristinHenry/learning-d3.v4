# Building a Custom D3 Plugin

In this tutorial, we’ll cover how to create your own modules (packages), and build them into custom 'plugins' for D3. We'll be using rollup and other tools that come with node.js and npm. 

We'll start with a walk through of a super-simple example. Then we'll create our own simple example. Finally, we'll finish with an example that demonstrates how to combine multiple source files into one plugin.

Note: This tutorial assumes that you are familiar with using the *command line*, and that you know where to find your browser's *console* output.

| Basic pattern to developing, building, and testing custom d3 plugins with npm |
|---|
| 1. Get starter files, and boiler-plate |
| 2. Edit/Write **source code** |
| 3. Edit/Update **Metadata for Building** with NPM   *(only edited when changing which resources to build)* |
| 4. **Test/Build** with NPM tools |
| - - - *in steps 1-4 wes're working with source code, in step 5 with built-library*  - - - |
| 5. **Test/Use** the newly built plugin in a browser with an html document. |




# Starting with a super-simple example:

We're going to start with a simple [example](https://github.com/KristinHenry/learning-d3.v4/blob/master/tutorial-start-with-plugin-src/d3-plugin-src.zip) (modified from an example by [Mike Bostock](https://bl.ocks.org/mbostock)), and make sure we can get each step working before writing any code of our own.


## 1. Get ready:

**a. Download and Install [node.js](https://nodejs.org/en/download/)**

If not already installed. *We're not building a node app, but we are going to use the package management tools that come with node (npm)*

**b. Download the [example plugin](https://github.com/KristinHenry/learning-d3.v4/blob/master/tutorial-start-with-plugin-src/d3-plugin-src.zip)** 

It contains a lot of boiler-plate. We can ignore most of it, for now, and just focus on the files we’ll be working with.

* Unzip and copy the unzipped folder to where you keep your active projects. 

**c. NPM Install**

* From your favorite **command line** interface, navigate to the folder containing the  package.json file, and then run

```
$ npm install
```

*If you’re on windows, you may need to use cygwin. [see notes here](#cygwin-for-windows).*


Running *npm install* created some new files and folders. We’re going to ignore most of them for now, and just look at these two: ‘*/src/foo.js*’ and ‘*index.js*’.


## 2. Prepare/Write new D3 function:


**_/src/foo.js file:_**

```
export default function() {
    return 42;
};
```

→ This is the actual code that we want to call with d3.foo(), like we'd call d3.select(), in our projects. Naming a function "default", tells the transpiler it's the ‘main’ function, and it's called with d3.foo() when used in the script tag of an HTML page.


## 3. Edit the Metadata for Building with NPM


**_index.js file:_**

```
export {default as foo} from “./src/foo”;
```

→ This tells the transpiler tools (npm & rollup) what to put into the built d3.foo.js plugin file. 


## 4. Test/Transpile/Rollup…make the thing!


From your command line, navigate to the folder containing the package.json file, and run 

```
$ npm test
```

→ this will produce the d3.foo.js file, which is the built plugin, and will now be in the ../build/ folder

** You may have noticed that the content of your build was different before running npm test.


## 5. Use it!

We've built our plugin, so now we're going to use it in an HTML document.

**a. Copy the new d3.foo.js file to a new folder**


**b. Create an index.html file in that same folder**

→ Depending on your usual workflow, you may want to bring the folder into your text editor at this point

**c. Write or copy-paste this snippet into your newly created html file:**


```
<!DOCTYPE html>
<meta charset="utf-8">
<script src="d3-foo.js"></script>

<script>
console.log(d3.foo());
</script>
```

**d. Start a local server**

I like python’s simple server, but use your favorite — this depends on your own workflow and whether you run a node server or a python server

**e. In your browser, navigate to your new index.html page, hosted on your local server.**

Examine the browser console. You should see ‘42’.

Woohoo! We did it! 

Resource: How to [open a console in various browsers](http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers).

---


# Let’s Make Our Own:

We just installed *npm* with [node.js](https://nodejs.org/en/download/), walked through a simple example, and built a simple d3 plugin. Then we tested the resulting foo.js file in an html page. All with an existing example, slightly modified from Mike Bostock's ‘Let’s Make a (D3) Plugin’ article. 

Now, let’s make our own plugin.


## 1. Get Ready
Download (or copy your first download) [example plugin](https://github.com/KristinHenry/learning-d3.v4/blob/master/tutorial-start-with-plugin-src/d3-plugin-src.zip). We need a fresh, untouched, copy. 

 → We’ll edit existing files and customize them.

At the command line, navigate to the folder with the  package.json file, and run

```
$ npm install
```

Note: You need to run npm install for each project you develop, because npm installs at a folder level. Somewhat like installing python in a virtualenv, but without the need for a venv.


## 2. Prepare/Write our Source Code

In the last example, we had a foo.js file.

This time, let’s do something a little different. Let’s create a new file called *fib.js*, in same folder as *foo.js* (which is our src folder):


**_fib.js_** file:

```
export default function() {
    return [0,1,1, 2, 3, 5, 8, 13];
};
```


## 3. Edit the Metadata for Building with NPM

**a. Modify export statement in the index.js file**

(which is at the same folder level as package.json)

**_index.js file_**

```
export {default as fib} from “./src/fib”;
```

→ Instead of exporting the foo function, now we’re exporting our new fib function.

**b. Modify the package.json file:**

Replace any instance of ‘foo’ with ‘fib’, in the package.json file.



## 4. Test/Transpile/Rollup…make the thing!

From Command line:
navigate to the folder containing the package.json file
and run 

```
$ npm test 
```

→ this will produce the d3.fib.js plugin file, which will now be in …/build/ folder, with your updates

If you’re on windows, you may need to use cygwin — see below)

**Did you get an error? Check to see if you still have the foo.js file in your src folder, delete it  and try again. Also, check to make sure you’ve replaced all instance of ‘foo’ with ‘fib’ in the files we’ve modified (index.js and package.json).


## 5. Use it!

**a. Copy the new d3.fib.js plugin file to a new folder**

**b. Create an html file in the same folder**

**c. Write or copy/paste this snippet into the html file:**

```
<!DOCTYPE html>
<meta charset="utf-8">
<script src="d3-fib.js"></script>

<script>
console.log(d3.fib());
</script>
```

**d. Start a local server, if you don’t already have one running.**

**e. In your browser, navigate to our new html page, hosted on your local server**

Examine the console, where you should see ‘[0, 1, 1, 2, 3, 5, 8, 13]’



---

# Multiple files in one bundle?

What if we want to combine *foo()* and *fib()* in one bundle?

## 1. Get Ready

Download (or copy your first download) [example plugin](https://github.com/KristinHenry/learning-d3.v4/blob/master/tutorial-start-with-plugin-src/d3-plugin-src.zip). We need a fresh, untouched, copy. 

## 2. Prepare Source files

Place copies of both source files (*fib.js* and *foo.js*, from previous steps) into the *src* folder.

** Modify *Test/foo-test.js*. We’ll just comment out the tests that come with the example plugin, for now.

## 3. Edit Metadata for Building with NPM

**a. Modify the index.js file**
(which is at the same folder level as package.json)

**_index.js file_**

```
export {default as fib} from “./src/fib”;
export {default as foo} from “./src/foo”;
```


**b. Modify the package.json file**

This time is a little more complicated than just replacing ‘foo’ with ‘fib’.

We'll add a ‘-g’ tag to indicate which sources to include in the build:

**_Pretest script:_**

```
“pretest”: “rm -rf build && mkdir build && rollup -g d3-fib:d3,d3-foo:d3 -f umd -n d3 -o build/d3-fibfoo.js — index.js”,
```

**_Prepublish & Postpublish scripts:_**

+ Make sure you rename the foo.js file names in package.json, so that foo.js is renamed as fibfoo.js.



## 4. Test/Transpile/Rollup…make the thing!

From your command line, rerun *npm install*, to make our build

Note: make sure that you are in the same folder as the  package.json file, when you run npm install or npm test. NPM installs at folder level, and looks for a package.json file for instructions on what to build.



## 5. Use it!

**a. Copy the new d3.fib.js file to a new folder and create an index.html file in the same folder**

**b. Write or copy/paste this snippet into the html file:**

```
<!DOCTYPE html>
<meta charset="utf-8">
<script src="d3-fibfoo.js"></script>

<script>
console.log(d3.fib(6));
console.log(d3.foo());
</script>
```

**c. Test this new html page in your browser**

Looking at the console, you should see our output.

Note: As you start experimenting on your own, be sure to copy your newly re-built d3-fibfoo.js file into the folder with your html document in it.


---




# Additional Info:


### CYGWIN for windows

**Why?**

Because the scripts for setting up d3 plugin uses ‘*rm*’ command, which is not supported in Windows.

Option: ‘*rm*’ doesn’t work on windows, so you could edit package.json to ‘*del*’ instead of ‘*rm*’, but this has issues.

Or, you could use cygwin terminal, instead. *This is a better option, especially if you're like me, and have to switch between systems, and want to use a common code base.*


**Install cygwin:** https://www.cygwin.com/

**Change PATH to include cygwin**: ( ;C:\Cygwin\bin) http://www.howtogeek.com/howto/41382/how-to-use-linux-commands-in-windows-with-cygwin/

From Cygwin, navigate up ( cd .. ) to get to /cygdrive/c and then down again to where your project files are.

You’ll run the commands in the tutorial, from this interface.


