const [{ Server: h1 }, x] = [require('http'), require('express')];
// const x = require('express');
const app = x();
// const router = x.Router();
const PORT = 4321;
const { log } = console;
const huc = { 
  'Content-Type': 'text/html; charset=utf-8',
  'Access-Control-Allow-Origin': '*'
};
const tuc = { 
  'Content-Type': 'text/plain; charset=utf-8',
  'Access-Control-Allow-Origin': '*' 
};

app
  .get('/', (r, rs, n) => { rs.status(200).set(tuc).end('79213589765') })
  .get('/login/', (r, rs, n) => { rs.status(200).set(tuc).end('79213589765') })
  .get('/sample/', (r, rs, n) => { 
    const textFunction = `function task(x) {
        return x * Math.pow(this, 2);
      }`;
    rs.status(200).set(tuc).end(textFunction)
  })
  .get('/promise/', (r, rs, n) => { 
    // const xNum = r.url.substring(1 + r.url.indexOf('?'));
    // const task = x => new Promise((res, rej) => {
    //   x > 18 ? res('yes') : rej('no');
    // })
    // task(xNum).then(x => rs.status(200).set(tuc).end(x)).catch(e => rs.status(200).set(tuc).end(e))
    // function task(x) {
    //   return new Promise((res, rej) => {
    //     x > 18 ? res('yes') : rej('no');
    //   })
    // }
    // rs.status(200).set(tuc).end('Done!')
    const textFunction = `function task(x) {
      return new Promise((res, rej) => x < 18 ? res('yes') : rej('no'); )
      }`;
    rs.status(200).set(tuc).end(textFunction)
  })

  .get('/fetch/', (r, rs, n) => { 
    // let page = `page`;
    let page = `
      <input id="inp">
      <button id="bt">button</button>
      <script>
        let inp = document.getElementById('inp'),
          bt = document.getElementById('bt');
        bt.addEventListener('click', () => { 
          if (inp.value != '') {
            fetch(inp.value)
            .then((res) => res.text().then((data) => inp.value = data)) 
          }
        });        
      </script>
    `;
    rs.status(200).set(huc).end(page)
  })

  .use((r, rs, n) => { r.errorMessage = 'Не найдено!'; n(); })
  .use(r => r.res.status(404).set(huc).send(r.errorMessage))
  .use((e, r, rs, n) => rs.status(500).set(huc).send(`Ошибка: ${e}`))
  // .set(tuc);
  // .listen(4321);
module.exports = h1(app)
  .listen(process.env.PORT || PORT, () => log(process.pid));
