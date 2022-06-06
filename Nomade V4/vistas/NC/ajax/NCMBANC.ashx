<%@ WebHandler Language="VB" Class="NCMBANC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMBANC : Implements IHttpHandler
    
    Dim OPCION As String
       
    Dim CODIGO, CODIGO_SUNAT, DESC, FECHA_VIG, FECHA_TERM, PIDM, NOM_COM, USUA_ID, ESTADO As String
    
    Dim dt As DataTable
    
    Dim banco As New Nomade.NC.NCBanco("Bn")
    Dim persona As New Nomade.NC.NCPersona("Bn")
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
                
        OPCION = context.Request("OPCION")
        
        CODIGO = context.Request("CODIGO")
        
        CODIGO_SUNAT = context.Request("CODIGO_SUNAT")
        DESC = context.Request("DESC")
        FECHA_VIG = context.Request("FECHA_VIG")
        FECHA_TERM = context.Request("FECHA_TERM")
        PIDM = context.Request("PIDM")
        NOM_COM = context.Request("NOM_COM")
        USUA_ID = context.Request("USUA_ID")
        ESTADO = context.Request("ESTADO")
        
        Dim filtrotypeahead As String = context.Request("q")
        
        Select Case OPCION
            Case "0"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = banco.ListarBanco(IIf(CODIGO = Nothing, " ", CODIGO), " ")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""BANCO"":""" & row("BANCO").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                        resb.Append("""PERSONA"":""" & row("PERSONA").ToString & """,")
                        resb.Append("""NOMBRE_COMERCIAL"":""" & row("NOMBRE_COMERCIAL").ToString & """,")
                        resb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                        resb.Append("""RUC"":""" & row("RUC").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"":""" & row("CODIGO_SUNAT").ToString & """,")
                        resb.Append("""FECHA_VIGENTE"":""" & row("FECHA_VIGENTE").ToString & """,")
                        resb.Append("""FECHA_TERMINO"":""" & row("FECHA_TERMINO").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = persona.listar_Persona_Juridica("0", String.Empty, filtrotypeahead)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                        resb.Append("""RAZONSOCIAL"":""" & row("RAZONSOCIAL").ToString & """,")
                        resb.Append("""RUC"":""" & row("NRO").ToString & """,")
                        resb.Append("""RAZO_COME"":""" & row("RAZO_COME").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "2"
                context.Response.ContentType = "text/plain"
                res = banco.CrearBanco(CODIGO_SUNAT, DESC, FECHA_VIG, IIf(FECHA_TERM = "", Nothing, FECHA_TERM), PIDM, NOM_COM, ESTADO, USUA_ID)
            Case "3"
                context.Response.ContentType = "text/plain"
                res = banco.ActualizarBanco(CODIGO, CODIGO_SUNAT, DESC, FECHA_VIG, IIf(FECHA_TERM = "", Nothing, FECHA_TERM), PIDM, NOM_COM, ESTADO, USUA_ID)
        End Select
        context.Response.Write(res)
        
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class