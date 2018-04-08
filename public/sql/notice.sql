#数据库语句来写公告的表
create database if not exists fbzr;
use fbzr;
drop table if exists notice;#如果原来存在这个表就要先删除
create table notice(
  id int not null auto_increment,
  username varchar(50) not null default '',          #发表的用户
  no_name varchar(50) not null default '',           #公告名称
  no_pic varchar(100) not null default '',            #公告照片
  no_time int not null default 0,                    #公告发表时间
  no_con text,                                       #公告详情
  primary key(id)                                    #主键
);