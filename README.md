# Shopping app with firebase & cloudinary

## 구현 사항

- [x]  로그인 페이지 - Google 소셜 로그인 with firebase
- [x]  admin 계정, 일반 계정 메뉴 다르게 보여주기
- [x]  admin 계정에서만 new product 새로운 제품 만드는 페이지에 접근 가능하게
- [x]  메인 페이지 - 제품 나열된 페이지
- [x]  제품 상세 페이지 - UI
- [x]  제품 상세 페이지 - cart에 제품 담기 기능
- [x]  장바구니 페이지 - UI
- [x]  장바구니 페이지 - api연동(제품 삭제 및 갯수 변동 기능)

## 구현하면서 어려운 부분

```
Q) cloudinary를 사용한 이유?
A) 이미지에 대한 http url주소를 만들어주기 위해서 사용함

Q) react-query에서 update나 write기능은 어떻게 구현하지?
A) mutation을 사용하면 되는데 useMutation hook을 사용해서 구현해보자.

Q) 장바구니 기능을 구현하는데 데이터를 저장을 어떤 방법으로 해야될 지 모르겠다.
옵션에 따라 quantity를 다르게 가져가야되는지?
현재 제품 id에 따라 quantity를 주고 있기 때문에 옵션이 다른 경우 구분이 되지 않고 있다.
A)
```
