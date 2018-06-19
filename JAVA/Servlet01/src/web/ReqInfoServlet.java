package web;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ReqInfoServlet extends HttpServlet {
	public void service(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		Enumeration e = request.getHeaderNames();
		while (e.hasMoreElements()) {
			String headerName = e.nextElement().toString();
			System.out.println(headerName + ":" + request.getHeader(headerName));
		}
		System.out.println("Request Method" + request.getMethod());
		System.out.println("Request Protocol" + request.getProtocol());
		System.out.println("Request URI" + request.getRequestURI());
		System.out.println("Request URL" + request.getRequestURL());
		System.out.println("Servlet Path" + request.getServletPath());
	}
}
