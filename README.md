# firebase-reference-helper

## Instalation and Usage
----
### Quick Start
```bash
$ npm install firebase-reference-helper

# alternatively
$ yarn add firebase-reference-helper
```

### Usage
```js
// Initiate reference
const ticketRef = reference(
  '/movie/{movie_id}/tickets/{ticket_id}',
  { movie_id: '', ticket_id: '' }
)

// use reference
const ref1 = ticketRef.ref({ movie_id: 12, ticket_id: 20 }) // /movie/12/tickets/20
const ref2 = ticketRef.ref({ movie_id: 12 }) // /movie/12/tickets/{ticket_id}
const ref3 = ticketRef.ref() // /movie/{movie_id}/tickets/{ticket_id}

```
