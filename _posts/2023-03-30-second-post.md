---
title:  "[Spring/H2] 스프링 DB 접근"
excerpt: ""
categories:
  - spring
tags:
  - [spring, jdbc, H2, Git]

toc: true
toc_sticky: true
 
date: 2023-03-30
last_modified_at: 2023-03-30
---
# H2 Database 실행  
  
H2 directory 내의 bin 폴더 안의  
Mac os ->  
h2.sh 실행

Window os ->  
h2.bat 실행
  
한번 실행하면 test.mv.db 파일이 user/home에 생성됨 
생성 된 후에는 
jdbc:h2:tcp://localhost/~/test
파일에 직접 접근하는 것이 아닌 소켓을 통해 접근 해야함

* * *
