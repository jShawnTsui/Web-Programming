<%@ page pageEncoding="utf-8" 
contentType="text/html;charset=utf-8" %>
<%@ page import="entity.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Employee Management</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		<script type="text/javascript" language="javascript" src="script/clock.js" ></script>
	</head>
	<body onload="updateClock(); setInterval('updateClock()', 1000)">
		<div id="wrap">
			<div id="top_content">
					<div id="header">
						<div id="rightheader">
							<p id="clock" >&nbsp;</p>
						</div>
						<div id="topheader">
							<h1 id="title">
								<a href="#">Main</a>
							</h1>
						</div>
						<div id="navigation">
						</div>
					</div>
				<div id="content">
					<p id="whereami">
					</p>
					<h1>
						Update Employee
					</h1>
					<% Employee e = (Employee) request.getAttribute("emp"); %>
					<form action="update.do?id=<%= e.getId() %>" method="post">
						<table cellpadding="0" cellspacing="0" border="0"
							class="form_table">
							<tr>
								<td valign="middle" align="right">
									ID:
								</td>
								<td valign="middle" align="left">
									<%= e.getId() %>
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right">
									Name:
								</td>
								<td valign="middle" align="left">
									<input type="text" class="inputgri" 
									name="name" value="<%= e.getName() %>"/>
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right">
									Salary:
								</td>
								<td valign="middle" align="left">
									<input type="text" class="inputgri" 
									name="salary" value="<%= e.getSalary() %>"/>
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right">
									Age:
								</td>
								<td valign="middle" align="left">
									<input type="text" class="inputgri"
									 name="age" value="<%= e.getAge() %>"/>
								</td>
							</tr>
						</table>
						<input type="hidden" name="id" value="${e.id}"/>
						<p>
							<input type="submit" class="button" 
							value="Confirm" />
							
							<input type="submit" class="button" 
							value="Confirm" />
						</p>
					</form>
				</div>
			</div>
			<div id="footer">
				<div id="footer_bg">
					Xiangyang Cui
				</div>
			</div>
		</div>
	</body>
</html>
