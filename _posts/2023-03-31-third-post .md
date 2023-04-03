---
title:  "[Spring] 스프링 JdbcTemplate"
excerpt: ""
categories:
  - spring
tags:
  - [spring, jdbc, Git]

toc: true
toc_sticky: true
 
date: 2023-03-31
last_modified_at: 2023-03-31
---
# JdbcTemplate
순수 Jdbc와 동일한 설정을 하면 된다.  
JDBC API에서 본 반복 코드를 대부분 제거해준다. 하지만 SQL 은 직접 작성해야 한다.  

**사용법
어노테이션 @Autowired 사용 (생성자가 싱글턴이라면 생략 가능)
```java

private final JdbcTemplate jdbcTemplate;

@Autowired
public JdbcTemplateRepository(DataSource dataSource){
	jdbcTemplate = new JdbcTemplate(dataSource);
}
```

* * *

회원 id 번호를 통해 회원을 찾는 예)
테이블 이름 : member

```java

public List<Member> findbyId(Long id){
	return jdbcTemplate.query("select * from member where id = ?", memberRowMapper(), id);
}
```
```java
private RowMapper<Member> memberRowMapper() {
	return new RowMapper<Member>(){
	@Override
		public Member mapRow(ResultSet rs, int rowNum) thorws SQLException{
			Member member = new Member();
			member.setId(rs.getLong("id"));
			member.setId(rs.getLong("name"));
			return member;
		}
	};
	
	//람다식으로 변경가능
	return (rs, rowNum) -> {
			Member member = new Member();
			member.setId(rs.getLong("id"));
			member.setId(rs.getLong("name"));
			return member;
	};
}
```
***
SimpleJdbcInsert 사용 회원가입 예)
```java
public Member save(Member member) {
	SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
	jdbcInsert.withTableName("member").usingGeneratedKeyColumns("id");
	Map<String, Object> parameters = new HashMap<>();
	parameters.put("name", member.getName());
	Number key = jdbcInsert.executeAndReturnKey(new MapSqlParameterSource(parameters));
 	member.setId(key.longValue());
 	return member;
 }
```
