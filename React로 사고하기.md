### **step1: ui를 컴포넌트 계층으로 쪼개기**
- Programming - 새로운 함수나 객체를 만드는 방식으로 해보기. 이 중 단일 책임 원칙 (모든 클래스는 하나의 책임만 가지며, 클래스는 그 책임을 완전히 캡슐화해야 함을 일컫는다.)
- CSS - 클래스 선택자를 무엇으로 만들지 생각해보기.
- Design - 디자인 계층을 어떤 식으로 구성할지 생각해보기.

JSON이 잘 구조화되어 있으면 종종 UI 컴포넌트 구조가 자연스럽게 데이터 모델에 대응되는 것을 발견할 수 있음.
이는 UI와 데이터 모델은 보통 같은 정보 아키텍처, 즉 같은 구조를 가지기 때문이다. (UI와 데이터 모델이 같은 구조라 컴포넌트 구조와 데이터 모델과 대응 됨).

### **step2: React로 정적인 버전 구현하기**
컴포넌트 계층구조를 만든 후 앱을 실제로 구현해 볼 시간이다.
가장 쉬운 접근 방법은 상호작용 기능은 아직 추가하지 않고 데이터 모델로부터 ui를 랜더링하는 버전을 만드는 것!
대체로 먼저 정적인 버전을 만들고 상호작용 기능을 추가하는 게 더 쉽다!

정적 버전을 만드는 것은 많은 타이핑이 필요하지만, 생각할 것은 적으며, 반대로 상호작용 기능을 추가하는 것은 많은 생각이 필요하지만, 타이핑은 많이 필요하지 않다.

데이터 모델을 렌더링하는 앱의 정적인 버전을 만들기 위해 다른 컴포넌트를 재사용하고 `Props`를 이용하여 데이터를 넘겨주는 `컴포넌트`를 구현할 수 있음. Props는 부모가 자식에서 데이터를 넘겨줄 때 사용하는 방법.   
**Props는 부모 -> 자식으로 데이터 전달**   
*혹시 `State` 개념에 익숙하더라도 정적인 버전을 만드는 데는 State를 사용하지 말 것!! State는 오직 상호작용을 위해, 즉 시간이 지남에 따라 데이터가 바뀌는 것에 사용한다.*

앱을 만들 때 계층 구조에 따라 상층부에 있는 컴포넌트부터 하향식으로 만들거나, 하층부에 있는 컴포넌트 부터 상향식으로 만들 수 있다.   
간단한 예시에서는 보통 하향식으로 만드는 게 쉽지만, 프로젝트가 커지면 상향식으로 만들고 테스트를 작성하면서 개발하는 것이 더 쉽다.

- 앱을 실제로 구현하기에 가장 쉬운 접근 방법은 **기능은 아직 추가하지 않고** 데이터 모델로부터 (JSON 데이터) UI를 렌더링하는 버전을 만들기 - 정적인 버전을 만들고 상호작용 기능을 추가하는 게 더 쉽다.
- 데이터 모델을 렌더링 하는 앱의 정적인 버전을 만들기 위해 다른 컴포넌트를 재사용하고 프롭스를 이용하여 데이터를 넘겨주는 컴포넌트를 구현할 수 있다. (스테이트 개념에 익숙해도 정적인 버전을 만드는데는 스테이트를 사용하지 말 것! 스테이트는 오직 **상호작용**을 위해, 시간이 지남에 따라 데이터가 바뀌는 것에 사용하기)
- 앱을 만들 때 계층 구조에 따라 상층부에 있는 컴포넌트부터 하향식으로 만들거나 혹은 하층부에 있는 컴포넌트부터 상향식으로 만들 수 있다.   
- 간단한 예시에서는 보통 하향식으로 만드는 게 쉽지만, **프로젝트가 커지면 상향식으로 만들고 테스트를 작성하면서 개발하는 것이 더 쉽다.**

```JSX
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

이처럼 데이터 렌더링을 위해 만들어진 재사용 가능한 컴포넌트들의 라이브러리를 가지게 된다. 현재는 앱의 정적 버전이기 때문에 컴포넌트는 단순히 JSX만 리턴한다. 계층구조의 최상단 컴포넌트 `FilterableProductTable`은 Prop으로 데이터 모델을 받는다. 이는 데이터가 최상단 컴포넌트부터 트리의 맨 아래까지 흘러가기 때문에 *단방향 데이터 흐름*이라고 한다.

### **Step 3: 최소한의 데이터만 이용해서 완벽하게 UI State 표현하기**
UI를 상호작용하게 만들려면 사용자가 기반 데이터 모델을 변경할 수 있게 해야 합니다. **State를 통해 기반 데이터 모델 변경할 수 있다.**   

State는 앱이 기억해야 하는, 변경할 수 있는 데이터의 최소 집합이라고 생각해라. State를 구조화하는 데 가장 중요한 원칙은 `중복 배제 원칙`이다.*(Don't repeat yourself; DRY. 소프트웨어 개발 원리의 하나로, 모든 형태의 정보 중복을 지양하는 원리이다. == const로 이해해도 될 것같다)*   
애플리케이션이 필요로 하는 가장 **최소한의 State를 파악**하고 나머지 모든 것들은 **필요에 따라 실시간으로 계산**해라. 예를 들어, 쇼핑 리스트를 만든다고 하면 당신은 배열에 상품 아이템들을 넣을 겁니다. UI에 상품 아이템의 개수를 노출하고 싶다면 상품 아이템 개수를 따로 State 값으로 가지는 게 아니라 단순하게 배열의 길이만 쓰면 된다.   

State가 되어야할 것은 아래 세가지 질문을 통해 결정할 수 있다.


* **시간이 지나도 변하지 않나요?** 그렇다면 확실히 State가 아니다. 
* **부모로 부터 Props를 통해 전달됩니까?** 그렇다면 확실히 State가 아니다.
* 컴포넌트 안의 다른 State나 Props를 가지고 **계산 가능한가요?** 그렇다면 *절대로* State가 아니다!

그 외에 남는 건 아마 State일 겁니다.

1. 제품의 원본 목록 => **Props로 전달되었기 때문에 State가 아니다.**
2. 사용자가 입력한 검색어 => **사용자가 입력한 검색어는 시간에 따라 변하고, 다른 요소로부터 계산할 수 없기 때문에 State로 볼 수 있다.**
3. 체크박스의 값 => **체크박스의 값을 시간에 따라 바뀌고 다른 요소로부터 계산할 수 없기 때문에 State로 볼 수 있다.**
4. 필터링된 제품 목록 => **필터링된 제품 목록은 원본 제품 목록을 받아서 검색어와 체크박스 값에 따라 *계산할 수 있으므로*, State가 아니다**


<hr/>

#### Props vs State
React는 Props와 State라는 두 개의 데이터 "모델"이 존재하며, 둘의 성격은 매우 다르다.

- **Props는 함수를 통해 전달되는 인자 같은 성격을 가진다.** Props는 부모 컴포넌트로부터 자식 컴포넌트로 데이터를 넘겨서 외관을 커스터마이징하게 해준다. 예를 들어 `Form`은 `color`라는 Prop을 `Button`으로 보내서 `Button`을 내가 원하는 형태로 커스터마이징할 수 있다.
- **State는 컴포넌트의 메모리 같은 성격을 가진다.** State는 컴포넌트가 몇몇 정보를 계속 따라갈 수 있게 해주고 변화하면서 상호작용을 만들어낸다. 예를 들어 `Button`은 `isHovered`라는 State를 따라갈 것이다.

Props와 State는 다르지만, 함께 동작합니다. State는 보통 **부모 컴포넌트에 저장한다.** (그래서 부모 컴포넌트는 그 State를 변경할 수 있다.) 그리고 부모 컴포넌트는 State를 자식 컴포넌트에 Props로서 전달한다.

<hr/>

### Step 4: State가 어디에 있어야 할 지 정하기
앱에서 필요한 최소한의 State를 결정한 후, 다음으로는 어떤 컴포넌트가 State를 소유하고, 변경할 책임을 지게 할 지 정해야한다.   
React는 항상 컴포넌트 계층구조를 따라 부모에서 자식으로 데이터를 전달하는 단방향 데이터 흐름을 사용하는 것을 기억해라!   
앱을 구현하면서 어떤 컴포넌트가 State를 가져야하는 지 명확하지 않을 수 있다.

애플리케이션의 각 State에 대해서,

1. 해당 state를 기반으로 렌더링하는 모든 컴포넌트 찾기
2. 그들의 가장 가까운 공통되는 부모 컴포넌트 찾기. 계층에서 모두를 포괄하는 상위 컴포넌트.
3. state가 어디에 위치해야 하는 지 결정하기.
  - 1. 대게, 공통 부모에 State를 그냥 두면 된다.
  - 2. 혹은, 공통 부모 상위 컴포넌트에 둬도 된다.
  - 3. state를 소유할 적절한 컴포넌트를 찾지 못했다면, **state를 소유하는 컴포넌트를 하나 만들어서 상위 계층에 추가하기**   

이전 단계에서, 이 애플리케이션의 두가지 state인 사용자의 검색어 입력과 체크박스의 값을 발견하였다. 이 예시에서 그들은 항상 함께 나타나기 때문에 같은 위치에 두는 것이 합리적이다.

이 전략을 애플리케이션에 적용해보기.

1. **state를 쓰는 컴포넌트를 찾기**
> - `ProductTable`은 state에 기반한 상품 리스트를 필터링해야한다. (검색어와 체크 박스의 값)
> - `SearchBar`는 state를 표시해 주어야 한다.(검색어와 체크 박스의 값)
2. **공통 부모를 찾기**: 둘 모두가 공유하는 첫 번째 부모는 `FilterableProductTable이다.
3. **어디에 state가 존재해야 할지 정하기**: 우리는 `FilterableProductTable`에 검색어와 체크 박스 값을 state로 둘 겁니다.

이제 스테이트 값은 `FilterableProductTable` 안에 있다.

`useState()` **HOOK**을 이용해서 state를 컴포넌트에 추가하기.

Hook은 React 기능에 "연결할 수" 있게 해주는 특별한 함수이다.

`FilterableProductTable`의 상단에 두 개의 state 변수를 추가해서 초깃값을 명확하게 보여주세요.

```
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
```

filterText와 inStockOnly라는 state변수를 추가해서 초깃값을 보여줌

다음으로, filterText와 inStockOnly를 FilterableProductTable 함수 안에 ProductTable와 SearchBar에게 Props로 전달하세요.

```
<div>
  <SearchBar
    filterText={filterText}
    inStockOnly={inStockOnly} />
  <ProductTable
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```

filterText의 초깃값을 useState('')에서 useState("fruit")로 수정하면 검색창과 데이터 테이블이 모두 업데이트 됨을 확인할 수 있다.

```
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}
function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."/>
      <label>
        <input
          type="checkbox"
          checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

해당 코드로는 아직 작업이 작동하지 않는다.

### **Step 5: 역 데이터 흐름 추가하기**
지금까지 계층 구조 아래로 흐르는 Props와 state의 함수로써 앱을 만들었다. 이제 사용자 입력에 따라 **state를 변경하려면 반대 방향의 데이터 흐름**을 만들어야한다. 이를 위해서는 계층 구조의 하단에 있는 컴포넌트에서 `FilterableProductTable`의 state를 업데이트할 수 있어야한다.

React는 데이터 흐름을 명시적으로 보이게 만들어준다. 그러나 전통적인 양방향 데이터 바인딩보다 더 많은 타이핑이 필요하다.

4단계의 예시에서 체크하거나 키보드를 타이핑할 경우 UI의 변화가 없고 입력을 무시하는 것을 확인할 수 있다.

이건 의도적으로 `<input value={filterText} />`로 코드를 쓰면서 `value`라는 prop이 항상 `FilterableProductTable`의 `filterText`라는 state를 통해서 데이터를 받도록 정했기 때문입니다. **`filterText`라는 state가 변경되는게 아니기 때문에 input의 value는 변하지 않고 화면도 바뀌는 게 없습니다**.

사용자가 input을 변경할 때마다 사용자의 입력을 반영할 수 있도록 State를 업데이트 해야한다.
state는 ` FilterableProductTable`이 가지고 있고 state 변경을 위해서는 `setFilterText`와 `setInStockOnly`를 호출하면 된다. 
* state를 변경하려면 set~~를 호출

`SearchBar`가 `FilterableProductTable`의 state를 업데이트할 수 있도록 하려면, 이 함수들을 `SearchBar`로 전달해야한다.

```
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

`SearchBar`에서 `onChange` 이벤트 핸들러를 추가하여 부모 state를 변경할 수 있도록 구현할 수 있다.

````
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
```

이제 애플리케이션이 작동된다.


여기까지는 리액트를 이용하여 컴포넌트와 앱을 만들려고 할 때 어떻게 사고해야할 지에 대한 흐름을 배워본 것이다.

상호작용 추가하기 섹션에서 스테이트를 변경하고 이벤트를 다루는 것에 대해 더 깊이 배울 수 있으며, 당장 리액트로 프로젝트를 시작할 수 있으며 해당 자습서를 좀 더 심화할 수 있다 :) ☺️