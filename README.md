![Sloth lazily moving from box to box](/logo.jpg)

# slothfuliter

Slothful Iterables brings the power of Array functions like `filter`, `map`, `forEach` to JavaScript's [iterators and generators ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

You can now lazily run transformations on data to create powerful stream operations while keeping your server's memory usage low.

## Installation and Usage

```
npm install slothfuliter
```

### Infinite Iterable

`infinite` can be used to create a sequence of an infinitely sized sequence of a single value.

The below example shows it being used to output the current Date for the next 10 seconds.

```js
import { infinite } from "slothfuliter"

const end = new Date(Date.now() + 10_000)

infinite(1)
.map(_ => new Date())
.takeWhile(now => now < end)
.forEach(now => console.log(now))
```

### Range Iterable

`range` can be used to create a fixed size sequence of numbers given a starting number and a length.

The below example shows it being used to output the first 15 fibonacci numbers.

```js
import { range } from "slothfuliter"

const SQRT_FIVE = Math.sqrt(5)

range(0, 15)
.map(i => (1 / SQRT_FIVE) * (Math.pow((1 + SQRT_FIVE) / 2, i) - Math.pow((1 - SQRT_FIVE) / 2, i)))
.map(Math.floor)
.forEach(i => console.log(i))
```