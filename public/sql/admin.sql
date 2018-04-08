/*创建管理员的表，也就是可以登录到系统后台的用户*/
create database if not exists fbzr;
use fbzr;
drop table if exists admin;  #如果原来存在这个表就要先删除

create table admin(
  id int not null auto_increment,
  username varchar(50) not null default '',
  password char(32) not null default '',
  primary key(id)
)charset utf8;

insert into admin (username,password) values
  ('admin',md5('admin')),
  ('dong15',md5('dong15')),
  ('ru16',md5('ru16')),
  ('duo06',md5('duo06'));