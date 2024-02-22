# Shopping app with firebase & cloudinary & netlify deployment

## Demo App
https://modencar-shoppy.netlify.app/

### ✔️ 전반적인 서비스 사용 데모<br/>
https://github.com/syoungee/shoppy/assets/22606199/6cdd53b4-60d5-4a3e-807e-720246a18dbe


### ✔️ 메인페이지
![스크린샷 2024-02-22 오후 1 43 41](https://github.com/syoungee/shoppy/assets/22606199/b8e4b330-f61f-4bf2-9ae0-df71b0c89076)
### ✔️ firebase 구글 로그인
![스크린샷 2024-02-22 오후 1 44 11](https://github.com/syoungee/shoppy/assets/22606199/aad6b63e-ea44-4092-b0bf-4a12152b5c1f)
### ✔️ 새로운 제품 등록
![스크린샷 2024-02-22 오후 1 45 08](https://github.com/syoungee/shoppy/assets/22606199/17e24136-8e60-4879-a65f-6f1a0cda4f78)
<br/>
### ✔️ 제품 페이지에 진입하면 옵션이 여러 개로 설정된 것 확인 가능<br/>
![스크린샷 2024-02-22 오후 1 45 57](https://github.com/syoungee/shoppy/assets/22606199/c92b846f-bddf-482c-81a3-2b6af8fe0012)
<br/>
### ✔️ 새로운 제품 생성 완료<br/>
![스크린샷 2024-02-22 오후 1 45 31](https://github.com/syoungee/shoppy/assets/22606199/aa61d3a0-212d-4e5f-b073-ec10af7b2c46)
### ✔️ 장바구니 페이지<br/>
![스크린샷 2024-02-22 오후 1 46 08 1](https://github.com/syoungee/shoppy/assets/22606199/04dd4846-72ed-432a-8890-fe2fca492f55) 


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
