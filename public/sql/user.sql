/*创建学生用户的表，也就是可以登录到系统前台的用户*/
create database if not exists fbzr;
use fbzr;
drop table if exists user;  #如果原来存在这个表就要先删除

create table user(
  id int not null auto_increment,
  username varchar(50) not null default '',
  idnum varchar(32) not null default '',
  password char(32) not null default '',
  primary key(id)
)charset utf8;

insert into user (username,idnum,password) values
  ('陈剑水','201509010101',md5('201509010101')),
  ('陈泽坤','201509010102',md5('201509010102')),
  ('旦增顿珠','201509010103',md5('201509010103')),
  ('董朝晖','201509010104',md5('201509010104')),
  ('方蔚金','201509010105',md5('201509010105')),
  ('付彦铎','201509010106',md5('201509010106')),
  ('苟启智','201509010108',md5('201509010108')),
  ('李凯宇','201509010111',md5('201509010111')),
  ('李祥兴','201509010112',md5('201509010112')),
  ('廖里红','201509010113',md5('201509010113')),
  ('林健','201509010114',md5('201509010114')),
  ('刘冬','201509010115',md5('201509010115')),
  ('司冰茹','201509010116',md5('201509010116')),
  ('孙阳','201509010117',md5('201509010117')),
  ('王可欣','201509010118',md5('201509010118')),
  ('王希','201509010119',md5('201509010119')),
  ('王小玉','201509010120',md5('201509010120'));