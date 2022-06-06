<%@ WebHandler Language="VB" Class="CONT_SELECT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CONT_SELECT : Implements IHttpHandler
    
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    
    Dim OPCION As Integer               'OPCION DEL CONTROL A OBTENER
    Dim CTLG_CODE As String             'CODIGO DE EMPRESA
    Dim ID_CONTROL As String            'ID DEL CONTROL DESEADO
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        
        '========== DESCRIPCION DE LOS VALORES QUE TE RETORNA CADA OPCION ===============
        '1 = Devuelve 'cont_cbomoneda' --> combo con moneda base y alterna
        
        CTLG_CODE = context.Request("CTLG_CODE")
        OPCION = context.Request("OPCION")
        ID_CONTROL = context.Request("ID_CONTROL")
        
        Select Case OPCION
            Case 1
                Dim m As New Nomade.NC.NCMonedas("Bn")
                Dim dt As DataTable
                dt = m.ListarMoneda_AL_BA(CTLG_CODE)
                m = Nothing
                resb.Append("<select id='" & ID_CONTROL & "' name='" & ID_CONTROL & "' class='required m-wrap chosen span12' data-placeholder='Seleccionar Moneda'>")
                resb.Append("<option></option>")
                If Not (dt Is Nothing) Then
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("<option value='" & MiDataRow("CODIGO").ToString & "'>" & MiDataRow("DESCRIPCION").ToString & "</option>")
                    Next
                    dt = Nothing
                End If
                resb.Append("</select>")
                res = resb.ToString
            Case Else
                res = "false"
        End Select
    
        context.Response.Write(res)
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class