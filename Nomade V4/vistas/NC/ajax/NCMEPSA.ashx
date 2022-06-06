<%@ WebHandler Language="VB" Class="NCMEPSA" %>

Imports System
Imports System.Web

Imports System.Data

Public Class NCMEPSA : Implements IHttpHandler
    Dim flag, res, p_cod_sunat, p_fec_inicio, p_fec_fin, user, activo, DESCRIPCION, codigo As String
   
    Dim resb As New StringBuilder
   
    Dim P As New Nomade.NC.NCEps("Bn")
    
    Dim dt, dt2 As DataTable
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
    
        flag = context.Request("flag")
        p_cod_sunat = context.Request("cosu")
        p_fec_inicio = context.Request("fein")
        If p_fec_inicio <> String.Empty Then
            p_fec_inicio = Utilities.fechaLocal(context.Request("fein"))
        End If
        p_fec_fin = context.Request("fefi")
        If p_fec_fin <> String.Empty Then
            p_fec_fin = Utilities.fechaLocal(context.Request("fefi"))
        End If
        user = context.Request("user")
        activo = context.Request("acti")
        DESCRIPCION = context.Request("pidm")
        codigo = context.Request("codigo")
        
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    
                    res = P.CrearEps(p_cod_sunat, DESCRIPCION, p_fec_inicio, p_fec_fin, activo, user)
                    
                Case "2"
                    
                    res = P.ActualizarEps(codigo, p_cod_sunat, DESCRIPCION, p_fec_inicio, p_fec_fin, activo, user)
                    
                Case "3"
                          
                    res = P.CambiarEstadoEps(codigo)
                    
                Case "4"
                          
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = P.ListarEps(codigo, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("codigo") & """,")
                    resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("fecha_ini") & """,")
                    resb.Append("""FECHA_FIN"" :" & """" & dt.Rows(0)("fecha_fin") & """,")
                    resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("codigo_sunat") & """,")
                    resb.Append("""PIDM"" :" & """" & dt.Rows(0)("pidm") & """,")
                    resb.Append("""RUC"" :" & """" & dt.Rows(0)("RUC") & """,")
                    resb.Append("""EPS"" :" & """" & dt.Rows(0)("EPS") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                Case "5"
                    dt2 = P.ListarPerJur()
                    res = GenerarTablaPJ(dt2) 'tabala persona juridica
                  
                 
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
    End Sub
 
    Public Function GenerarTablaPJ(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>PERSONA</th>"
            res += "<th>RUC</th>"
            res += "<th>DIRECCION</th>"
            res += "<th>COMERCIAL</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id=""" & dt.Rows(i)("PIDM").ToString() & """>"
                res += "<td id=""per" & dt.Rows(i)("PIDM").ToString() & """>" & dt.Rows(i)("persona").ToString() & "</td>"
                res += "<td id=""ruc" & dt.Rows(i)("PIDM").ToString() & """>" & dt.Rows(i)("ruc").ToString() & "</td>"
                res += "<td id=""dir" & dt.Rows(i)("PIDM").ToString() & """>" & dt.Rows(i)("direccion").ToString() & "</td>"
                res += "<td id=""raz" & dt.Rows(i)("PIDM").ToString() & """>" & dt.Rows(i)("RazSocial").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class