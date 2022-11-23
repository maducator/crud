# crud
jpa로 CRUD를 진행한다.

## 실행 방법
설정은 localhost:3306/spring db가 있는 것을 가정하고 있다.
mysql이나 mariadb를 설치하고,
create database spring;
grant all privileges on spring.* on YOUR_ID@localhost identified by 'YOUR_PASSWORD';
와 같이 만든 후,
git clone을 하여 IDE에 띄우고 실행하면 된다.

## sql 파일
shell에서 db에 쉽게 접근하기 위한 파일.
$ ./sql
로 실행할 수 있다.
물론 그 전에 username/password를 변경 해 놓아야 한다.

## blog.sql
mariadb를 가정하고 있으므로, created, updated 필드를 자동으로 넣는다.
$ ./sql < blog.sql
로 생성할 수 있다.
프로그램이 데이터를 못 가져오는 경우 등은 blog 테이블을 지우고, hibernate에서 테이블을 어떻게 만드는지 확인하는 것이 좋다.

## application.properties
여기에 datasource를 셋팅하면 spring은 자동은 DataSource 인스턴스를 만들고,
jpa는 이를 사용하여 DB와 소통한다.

## jpa
BlogRepository가 JpaRepository를 extends 하면 이를 @Autowired 로 연결할 때
BlogRepository 인터페이스를 따르는 Hibernate 객체를 건네준다.
Controller에서는 Service를 쓰고, Service에서 Repository를 쓰는 것이 일반적인 컨벤션 이지만,
blog 패키지에서는 서비스를 생략하였다.
또한 다른 package도 생략하여 간소화 하였다.

## static/blog.html
blog.html 파일은 cdn을 사용하여 간단히 CRUD를 사용하는 예시이다.
