<%@ WebHandler Language="VB" Class="NMMPRES" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMMPRES : Implements IHttpHandler
    Dim OPCION As String
    Dim CODE, DESC, ESTADO_IND, USUA_ID As String   
    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        CODE = context.Request("CODE")
        DESC = context.Request("DESC")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")

        Select Case OPCION.ToString
            Case "1" 'Actualiza Estado Presentaciones
                Dim m As New Nomade.NM.NMPresentacionProd("Bn")
                res = m.CambiarEstadoPresentacionProd(CODE)
                m = Nothing
            Case "2" 'Lista Presentaciones
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim m As New Nomade.NM.NMPresentacionProd("Bn")
                dt = m.ListarPresentacionProd(CODE, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""PRESENTACION"" :" & """" & dt.Rows(0)("PRESENTACION") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")

                    resb.Append("}")
                    resb.Append("]")
                End If
                res = resb.ToString()
                m = Nothing
            Case "3"
                Dim m As New Nomade.NM.NMPresentacionProd("Bn")
                res = m.CrearPresentacionProd(DESC, ESTADO_IND, USUA_ID)
                m = Nothing
            Case "4"
                Dim m As New Nomade.NM.NMPresentacionProd("Bn")
                res = m.ActualizarPresentacionProd(CODE, DESC, ESTADO_IND, USUA_ID)
                m = Nothing
        End Select
        context.Response.Write(res)

    End Sub
 
    
    
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
                    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class