#数据库语句来写留言板回复的表
create database if not exists fbzr;
use fbzr;
drop table if exists reply;  #如果原来存在这个表就要先删除
create table reply(
  id int not null auto_increment,
  uid int not null default 0,                               #msg中的id
  name varchar(30) not null default '',                     #评论者的学号
  content text not null,                                    #内容
  addtime int not null default 0,                           #时间
  primary key(id)                                           #主键
);