## Minimal React playground

```
npm install
```

```
npm start
```

## Steps
- Counter with offset. Everything's fine
- Batching
- Async increment
- Open modal / close modal 
- Increment on close (onClose callback)
- Content with self-close button

--> Realize that passing closures around may not be the best
design choice

## Possible fixes
- `useState`: Always use `setCount((prev) => prev + 1)` type of invocation when possible
- Closures are like a snapshot of the state around. This is error-prone, use a different strategy if possible

  - In our case extract modal 'content' into a component and `useModal()` inside it will solve the problem
- Use useRef instead of useState might solve some problem

    - But you might encounter the same problem if you do this:
    ```
    const stack = stackRef.current
    const doSomething = () => {
      console.log(stack)
    }
    
    ```
  
