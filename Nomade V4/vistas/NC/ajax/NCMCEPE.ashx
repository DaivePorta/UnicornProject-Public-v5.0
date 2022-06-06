<%@ WebHandler Language="VB" Class="NCMCEPE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMCEPE : Implements IHttpHandler
    
    
    Dim OPCION, p_anio, p_ctlg, p_mes, p_fec_cierre, p_fec_declara, p_usua_id As String
    Dim p_COEFICIENTE, p_ESTADO, p_CODE As String

    
    Dim dt As DataTable
    Dim NFPeriodo As New Nomade.NF.NFPeriodo("")
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        p_ctlg = context.Request("p_ctlg")
        p_anio = context.Request("p_anio")
        p_mes = context.Request("p_mes")
        p_fec_cierre = context.Request("p_fec_cierre")
        p_fec_declara = context.Request("p_fec_declara")
        p_usua_id = context.Request("p_usua_id")
        p_COEFICIENTE = context.Request("p_COEFICIENTE")
        p_ESTADO = context.Request("p_ESTADO")
        p_CODE = context.Request("p_CODE") 'Ejem: ABRIL 2016

        ' Utilities.fechaLocal('')
        Select Case OPCION
                
            Case "1" ' lista fecha declaracion
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = NFPeriodo.Devuelve_Fecha_Declaracion_Tributaria(p_mes, p_ctlg, p_anio)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                      
                        resb.Append("""FECHA_DECLARACION"":""" & MiDataRow("FECHA_DECLARACION").ToString & """")
                    
                        
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                        
                End If
                res = resb.ToString()
            Case "2" ' CIERRE DE PERIODO TRIBUTARIO
                context.Response.ContentType = "text/html"
                res = Cerrar_Periodo(p_mes, p_ctlg, p_anio, p_fec_cierre, p_fec_declara, p_usua_id, p_COEFICIENTE)
        
            Case "3" ' LISTA DE PERIODOS TRIBUTARIO
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NFPeriodo As New Nomade.NF.NFPeriodo("Bn")
                dt = NFPeriodo.Listar_Periodo(p_ESTADO, p_anio, p_ctlg)
                If Not dt Is Nothing Then
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
            Case "3" ' LISTA DE PERIODOS TRIBUTARIO
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NFPeriodo As New Nomade.NF.NFPeriodo("Bn")
                dt = NFPeriodo.Listar_Periodo(p_CODE, p_anio, p_ctlg)
                If Not dt Is Nothing Then
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
                
            Case "4" ' ACTUALIZAR COEFICIENTE DE PERIODOS TRIBUTARIO
                context.Response.ContentType = "text/html"
                Dim NFPeriodo As New Nomade.NF.NFPeriodo("Bn")
                res = NFPeriodo.ActualizarCoeficientePeriodo(p_CODE, p_ctlg, p_COEFICIENTE)
                
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
    
    Public Function Cerrar_Periodo(p_mes As String, p_ctlg As String, p_anio As String,
                                    p_fec_cierre As String, p_fec_declara As String,
                                    p_usua_id As String, p_COEFICIENTE As String) As String
    
        Dim msg As String
        Try
            Dim NFPeriodo As New Nomade.NF.NFPeriodo("Bn")
            msg = NFPeriodo.Cerrar_Periodo(p_mes, p_ctlg, p_anio,
                                           Utilities.fechaLocal(p_fec_cierre),
                                           Utilities.fechaLocal(p_fec_declara),
                                           p_usua_id, p_COEFICIENTE)
            NFPeriodo = Nothing
           
        Catch ex As Exception
            msg = "Error"
        End Try
        Return msg
    End Function
    
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class