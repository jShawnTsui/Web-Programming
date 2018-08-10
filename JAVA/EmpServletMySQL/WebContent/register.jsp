<%@page pageEncoding="utf-8"  
contentType="text/html;charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Eployee Management</title>
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
						Register
					</h1>
					<form action="register.do" method="post">
						<table cellpadding="0" cellspacing="0" border="0"
							class="form_table">
							<tr>
								<td valign="middle" align="right">
									User&nbsp;Name:
								</td>
								<td valign="middle" align="left">
									<input type="text" class="inputgri" 
									name="username" />
									<% String errorMsg = (String)request.getAttribute("register_error"); %>
									<span style="color:red;"><%= errorMsg == null?"":errorMsg %></span>
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right">
									Name:
								</td>
								<td valign="middle" align="left">
									<input type="text" class="inputgri" 
									name="name" />
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right">
									Password:
								</td>
								<td valign="middle" align="left">
									<input type="password" class="inputgri" 
									name="pwd" />
								</td>
							</tr>
							<tr>
								<td valign="middle" align="right">
									Gender:
								</td>
								<td valign="middle" align="left">
									Male
									<input type="radio" class="inputgri" 
									name="sex" value="m" checked="checked"/>&nbsp;&nbsp;
									Female
									<input type="radio" class="inputgri" 
									name="sex" value="f"/>
								</td>
							</tr>
						</table>
						<p>
							<input type="submit" class="button" 
							value="Confirm" />
							<input type="button" class="button" onclick="location.href='login.jsp';"
							value="Login" />
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