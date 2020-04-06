describe('render todo', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  after (async function () {
    await page.close();
  });

  it('should have correct title', async function() {
      expect(await page.title()).to.eql('React App');
  })
  it('should render todo correct', async function() {
    let todoList = await page.waitFor('.todoList');
    const expectTodoContent = await page.evaluate(todoList => todoList.childNodes.length, todoList);
    expect(expectTodoContent).to.eql(3);
  }) 

});


describe('complete todo', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  after (async function () {
    await page.close();
  });

  it('should have correct title', async function() {
      expect(await page.title()).to.eql('React App');
  })
  it('should complete todo correct', async function() {
    await page.click(".item", {delay: 500});
    let todoList = await page.waitFor('.todoList');
    const expectCompleteContent = await page.evaluate(todoList => todoList.querySelector('.item').style.color, todoList);
    expect(expectCompleteContent).to.eql('gray');
  }) 

});


describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('React App');
    })
    it('should new todo correct', async function() {
      await page.click('.newInput', {delay: 500});
      await page.type('.newInput', 'new todo item', {delay: 50});
      await page.click('.addBtn');
      let todoList = await page.waitFor('.todoList');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('button').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 

  });