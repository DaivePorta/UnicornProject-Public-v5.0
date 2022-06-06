<%@ WebHandler Language="VB" Class="NSMCLAS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSMCLAS : Implements IHttpHandler
    
    Dim OPCION As String
    Dim SIST_CODE As String
    
    Dim CODE, DESC, ESTADO_IND, USUA_ID, DETAIL As String
    Dim DETAIL_COUNT As Integer
    
    Dim dt As DataTable
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        OPCION = context.Request("OPCION")
        SIST_CODE = context.Request("SIST_CODE")
        CODE = context.Request("CODE")
        DESC = context.Request("DESC")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
        DETAIL = context.Request("DETAIL")
        DETAIL_COUNT = context.Request("DETAIL_COUNT")
        
        Select Case OPCION
                          
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim t As New NOMADE.NS.NSSistema("Bn")
                dt = t.ListarSistema(String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim f As New NOMADE.NS.NSFormas("Bn")
                dt = f.Listar_Formas(String.Empty, "A", SIST_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCR").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                
            Case "N"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim c As New NOMADE.NS.NSClases("Bn")
                resArray = GrabarClases(CODE, DESC, SIST_CODE, ESTADO_IND, USUA_ID, DETAIL, DETAIL_COUNT)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
                
            Case "M"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim c As New NOMADE.NS.NSClases("Bn")
                resArray = ActualizarClases(CODE, DESC, SIST_CODE, ESTADO_IND, USUA_ID, DETAIL, DETAIL_COUNT)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
                
            Case "L"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim c As New NOMADE.NS.NSClases("Bn")
                dt = c.Listar_Clases(CODE, String.Empty, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                        resb.Append("""DESCR"" :" & """" & MiDataRow("DESCR").ToString & """,")
                        resb.Append("""SIST_CODE"" :" & """" & MiDataRow("SIST_CODE").ToString & """,")
                        resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                        If MiDataRow("JSON_DETAIL") Is DBNull.Value Then
                            resb.Append("""JSON_DETAIL"" :" & """[]""")
                        Else
                            resb.Append("""JSON_DETAIL"" :" & MiDataRow("JSON_DETAIL").ToString & "")
                        End If
                        resb.Append("}")
                    Next
                    resb.Append("]")
                End If
                res = resb.ToString()
                
            Case Else
                
        End Select
        context.Response.Write(res)
        
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
    
    Public Function GrabarClases(ByVal p_GTVCLAS_CODE As String, ByVal p_GTVCLAS_DESC As String, ByVal p_GTVCLAS_SIST_CODE As String, ByVal p_GTVCLAS_ESTADO_IND As String, ByVal p_GTVCLAS_USUA_ID As String,
                                 ByVal p_DETAIL As String, ByVal p_DETAIL_COUNT As Integer) As Array
        Dim datos(2) As String
        Dim c As New NOMADE.NS.NSClases("Bn")
        datos = c.Crear_Clases(p_GTVCLAS_CODE, p_GTVCLAS_DESC, p_GTVCLAS_SIST_CODE, p_GTVCLAS_ESTADO_IND, p_GTVCLAS_USUA_ID, p_DETAIL, p_DETAIL_COUNT)
        Return datos
    End Function
    
    Public Function ActualizarClases(ByVal p_GTVCLAS_CODE As String, ByVal p_GTVCLAS_DESC As String, ByVal p_GTVCLAS_SIST_CODE As String, ByVal p_GTVCLAS_ESTADO_IND As String, ByVal p_GTVCLAS_USUA_ID As String,
                                 ByVal p_DETAIL As String, ByVal p_DETAIL_COUNT As Integer) As Array
        Dim datos(1) As String
        Dim c As New NOMADE.NS.NSClases("Bn")
        datos = c.Actualizar_Clases(p_GTVCLAS_CODE, p_GTVCLAS_DESC, p_GTVCLAS_SIST_CODE, p_GTVCLAS_ESTADO_IND, p_GTVCLAS_USUA_ID, p_DETAIL, p_DETAIL_COUNT)
        Return datos
    End Function

End Class