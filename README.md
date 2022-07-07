# Contact List API

Web application to consume the data made available by the API(s) which stores people and their contacts.


## Setting the project up

### CLI

Clone this repository and execute:

```bash
npm install
npm start
```

### Docker

Run the existing image by executing:

```bash
docker pull viniciusvviterbo/contactlistweb
docker run -d --rm -p 8888:8888 --name contactlist_web viniciusvviterbo/contactlistweb
```
or build your own image by cloning this repository and executing:

```bash
docker build -t viniciusvviterbo/contactlistweb .
docker run -d --rm -p 8888:8888 --name contactlist_web viniciusvviterbo/contactlistweb
```

---

**[GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html)**
