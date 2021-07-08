---
title: Base
description: Ngaox-Pdaup Default styling for all HTML elements
published: true
---

# Base

Ngaox-Pdaup Default styling for all HTML elements.

---

## General

- All elements are rendred consistently and in line with modern standards across all browsers
  by utilizing the famous [Normalize.css](http://necolas.github.io/normalize.css/) styling.
- Media & Embedded content tags like `<img>`, `<canvas>`, `<video>`, `<svg>` and `<audio>` are responsive and well aligned.
- Ngaox-Padup supports latest versions of all modern browser (Chrome, IE, Edge, Safari, Firefox, Opera, etc).

---

## Headings

use the tags `<h1>` to `<h6>` to define your headings.

You can also use the classes `.h1`, `.h2`, `.h3`, `.h4`, `.h5`, `.h6`.

```preview-html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

---

## Text Elements

| Element                     | Description                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `<a>`, `.link`              | Specifie a hypertext using [a element](#) or by adding `.link` class to a [span elemnt](#).                   |
| `<p>`                       | Create a paragraph by using the `<p>` element                                                                 |
| `<abbr>`                    | Define an abbreviation or an acronym with a <abbr title="Lorem Title">abbr tag that has a title</abbr>        |
| `<em>`                      | Emphasize text using the <em>em element</em>                                                                  |
| `<q>`                       | Specifie an inline quote <q>This is a q tag <q>inside</q> a q tag!</q>                                        |
| `<strong>`                  | Define text with <b>strong importance</b>                                                                     |
| `<b>`                       | Specifie bold text using <b>b tag</b>                                                                         |
| `<hr>` (Horizontal rule)    | <hr>                                                                                                          |
| `<small>`                   | Defines smaller text (like copyright and other side-comments) with the <small>small element.</small>          |
| `<kbd>`, `<samp>`, `<code>` | Define inline `code snippets` (code), keyboard <kbd>inputs</kbd> (kbd) and sample <samp>output</samp> (samp). |
| `<sub>`, `<sup>`            | Define <sub>subscript</sub> (sub) and <sup>superscript</sup> (sup) text.                                      |

---

## Blockquote

use the `<blockquote>` to quote a large section of text from another source.

```preview-html
<blockquote cite="#">
  <p>
    For 50 years, WWF has been protecting the future of nature. The world's
    leading conservation organization, WWF works in 100 countries and is
    supported by 1.2 million members in the United States and close to 5
    million globally.
  </p>
  <footer>
    WHO in <cite><a href="#">Source</a></cite>
  </footer>
</blockquote>
```

---

## Lists

use the `<ul>` element to make an unordered list and the `<ol>` element for ordered lists.

And define your lists items with the `<li>` element.

```preview-html
<!-- Unordered list -->
<ul>
  <li>First item</li>
  <li>
    Second item
    <!-- Ordered list -->
    <ol>
      <li>Indented ol item</li>
      <li>Indented ol item</li>
    </ol>
  </li>
  <li>Third item</li>
</ul>
```

& create a list of terms and their descriptions with the `<dl>`, `<dt>` and `<dd>` elements.

```preview-html
<dl>
  <dt>Description list term</dt>
  <dd>This is the term description.</dd>
  <dt>Lorem ipsum</dt>
  <dd>Lorem ipsum dolor sit amet consectetur adipisicing elit.</dd>
</dl>
```

---

## Preformatted Text

Define preformatted text using the `<pre>` tag. Which is displayed in a fixed-width font, and the text preserves both spaces and line breaks.
Usualy used as parent of `<code>` element to define code blocks.

```preview-html
<pre><code>// Code block
&lt;div&gt;
  &lt;p&gt;Lorem, ipsum dolor sit amet consectetur adipisicing elit.&lt;/p&gt;
&lt;/div&gt;</code></pre>
```
