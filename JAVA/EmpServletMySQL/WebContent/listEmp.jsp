<%@ page pageEncoding="utf-8" 
contentType="text/html;charset=utf-8" %>
<%@ page import="dao.*, entity.*, java.util.*, java.text.SimpleDateFormat"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>List of All Employees</title>
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
							<a href="#">Home</a>
						</h1>
					</div>
					<div id="navigation"></div>
				</div>
				<div id="content">
					<p id="whereami">
					</p>
					<h1>
						List of Employees
					</h1>
					<table class="table">
						<tr class="table_header">
							<td>
								ID
							</td>
							<td>
								Name
							</td>
							<td>
								Salary
							</td>
							<td>
								Age
							</td>
							<td>
								Oparation
							</td>
						</tr>
						<%
			                EmployeeDAO dao = new EmployeeDAO();
			                List<Employee> emps = dao.findAll();
			                for (int i = 0; i < emps.size(); i++) {
			                    Employee emp = emps.get(i);
			            %>
			            <tr class="row<%= i % 2 + 1 %>">
			                <td><%=emp.getId()%></td>     
			                <td><%=emp.getName()%></td>  
			                <td><%=emp.getSalary()%></td>  
			                <td><%=emp.getAge()%></td> 
			                <td><a href="#" 
			                	onclick="return confirm('I disabled this function.');">DELETE</a>&nbsp;
			                	<a href="load.do?id=<%=emp.getId()%>">UPDATE</a>
			                </td> 
			            </tr> 
			            <%  }  %>   
					</table>
					<p>
						<input type="button" class="button" 
						value="Add Employee" 
						onclick="location='addEmp.jsp'"/>
					</p>
				</div>
			</div>
			<div id="footer">
				<div id="footer_bg">Xiangyang Cui</div>
			</div>
		</div>
	</body>
</html>
