#数据库语句来写留言板的表
create database if not exists fbzr;
use fbzr;
drop table if exists msg;  #如果原来存在这个表就要先删除
create table msg(
  id int not null auto_increment,
  title varchar(50) not null default '',                    #标题
  idnum varchar(50) not null default '',                    #学号
  name varchar(50) not null default '',                     #姓名
  email varchar(50) not null default '',                    #邮箱
  content text not null,                                    #内容
  islock int not null default 1,                           #是否可见
  addtime int not null default 0,                           #时间
  primary key(id)                                           #主键
);