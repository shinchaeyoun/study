## UI 표현하기

react는 사용자 인터페이스(ui)를 렌더링하기 위한 Javascript 라이브러리입니다. ui는 버튼, 텍스트, 이미지와 같은 **작은 요소로 구성**됩니다.
react를 통해 작은 요소들을 재사용 가능하고 중첩할 수 있는 *컴포넌트*로 조합할 수 있다. **화면에 있는 모든 것**을 컴포넌트로 나눌 수 있다.


---
### 컴포넌트
컴포넌트 == 독립된 UI 조각. 리액트 컴포넌트는 마크업을 얹을 수 있는 자바스크립트 함수이다. 컴포넌트는 버튼과 같이 작을 수도 있고 전체 페이지와 같이 큰 경우도 있다.

다음의 `gallery`컴포넌트는 세 개의 `Profile`컴포넌트를 렌더링한다.

```
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

---
### [JSX로 마크업 작성하기](https://ko.react.dev/learn/writing-markup-with-jsx)
React컴포넌트는 React가 브라우저에 렌더링하는 **마크업을 포함할 수 있는 Javascrip 함수**이다. react 컴포넌트는 그 마크업을 표현하기 위해 JSX라는 확장된 문법을 사용한다. JSX는 HTML과 매우 **유사**하지만 조금 더 **엄격**하며 **동적인 정보를 표시**할 수 있다.   
기존의 HTML 마크업을 React 컴포넌트에 그대로 붙여넣으면 동작하지 않을 수 있다.

```
// 작동하지 않는 코드
export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1>Hedy Lamarr's Todos</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve spectrum technology
    </ul>
  );
}
```

이미 만들어진 HTML 마크업이 있다면 [converter](https://transform.tools/html-to-jsx)를 사용하여 변환할 수 있다.

```
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve spectrum technology</li>
      </ul>
    </>
  );
}
```

---

### [JSX에서 중괄호를 이용하여 JavaScript 사용하기](https://ko.react.dev/learn/javascript-in-jsx-with-curly-braces)

---

### [컴포넌트에 Props 전달하기](https://ko.react.dev/learn/passing-props-to-a-component)
리액트 컴포넌트는 서로 통신하기 위해 props를 사용한다. 모든 부모 컴포넌트는 자식 컴포넌트에 props를 제공하여 정보를 전달할 수 있다. Props는 HTML 어트리뷰트와 유사해 보이지만 객체, 배열, 함수를 포함한 모든 자바스크립트 값이 전달될 수 있다. 심지어 JSX도 가능하다

