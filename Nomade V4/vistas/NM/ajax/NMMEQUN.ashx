<%@ WebHandler Language="VB" Class="NMMEQUN" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMMEQUN : Implements IHttpHandler
    
    Dim flag As String
    Dim dt As DataTable
    Dim p As New Nomade.NM.NMEquivalenciaUnidades("Bn")
    Dim res As String
    Dim codigo, codigo_eq, user, equivalencia As String
    Dim resb As New StringBuilder
    Dim unvo As String
       
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
       
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        codigo_eq = context.Request("coeq")
        user = context.Request("user")
        equivalencia = context.Request("equi")
       
        
        Try
            
            Select Case flag.ToString
        
                Case "1"
                    
                    res = p.CrearEquivalenciaUnMe(codigo, equivalencia, codigo_eq, user)
                    
                Case "2"
                    
                    res = p.ActualizarEquivalenciaUnMe(codigo, equivalencia, codigo_eq, user)
                    
                Case "3"
                    
                    
                    
                Case "4"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarEquivalenciaUnMe(codigo, codigo_eq)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"":""" & dt.Rows(0)("CODIGO").ToString & """,")
                    resb.Append("""CODIGO_EQUI"" :" & """" & dt.Rows(0)("CODIGO_EQUI") & """,")
                    resb.Append("""EQUIVALENCIA"" :" & """" & dt.Rows(0)("EQUIVALENCIA") & """")
                   
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
            
                Case "5"
                    Dim p As New Nomade.NM.NMUnidadMedida("Bn")
                    dt = p.ListarUnidadMedida(String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "UNIDAD DE MEDIDA")
                    
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim P As New Nomade.NM.NMEquivalenciaUnidades("Bn")
                    dt = p.ListarEquivalenciaUnMe(String.Empty, String.Empty)
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""UNIDAD_MEDIDA"":{""CODIGO"":""" & row("CODIGO").ToString & """,""NOMBRE"":""" & row("UNIDAD_MEDIDA").ToString & """},")
                            resb.Append("""UNIDAD_MEDIDA_EQ"":{""CODIGO"":""" & row("CODIGO_EQUI").ToString & """,""NOMBRE"":""" & row("UNIDAD_MEDIDA_EQ").ToString & """},")
                            resb.Append("""EQUIVALENCIA"":""" & row("EQUIVALENCIA").ToString & """")
                    
                            resb.Append("},")

                        Next

                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                       
                    End If
                    res = resb.ToString()
            End Select
            
            context.Response.Write(res)
        
        Catch ex As Exception
            context.Response.Write("error!!!:" & ex.ToString)
        End Try
    End Sub
 
     
 
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
           
            
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """ tipo=""" & dt.Rows(i)("COD_TIPO_UNIDAD").ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next
        Else
            res = "<option>Sin Datos</option>"
        End If
        Return res
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class