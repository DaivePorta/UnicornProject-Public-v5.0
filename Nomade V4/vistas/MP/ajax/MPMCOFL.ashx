<%@ WebHandler Language="VB" Class="MPMCOFL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class MPMCOFL : Implements IHttpHandler
    
    Dim OPCION As String
    
    Dim dt As New DataTable
    
    Dim res As String
    Dim sb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        
        Dim CODIGO, CTLG_CODE, SCSL_CODE, ORFL_CODE, ORDEN_FLUJO, ACFI_CODE, ACTIVO, FECHA_INICIO, FECHA_FIN, ESTADO, USUA_ID As String
        
        CODIGO = context.Request("CODIGO")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        
        Try
            Select Case OPCION
                Case "S"
                    ORFL_CODE = context.Request("ORFL_CODE")
                    ACFI_CODE = context.Request("ACFI_CODE")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.MP.MPAdministracionFlotas("BN").ListarAdmFlotas(CODIGO, CTLG_CODE, SCSL_CODE, ORFL_CODE, ACFI_CODE, "")
                    If Not dt Is Nothing Then
                        sb.Append("[")
                        For Each row As DataRow In dt.Rows
                            sb.Append("{")
                            sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            sb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                            sb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                            sb.Append("""ORFL_CODE"":""" & row("ORFL_CODE").ToString & """,")
                            sb.Append("""ORDEN_FLUJO"":""" & row("ORDEN_FLUJO").ToString & """,")
                            sb.Append("""ACFI_CODE"":""" & row("ACFI_CODE").ToString & """,")
                            sb.Append("""ACTIVO"":""" & row("ACTIVO").ToString & """,")
                            sb.Append("""FECHA_INICIO"":""" & row("FECHA_INICIO").ToString & """,")
                            sb.Append("""FECHA_FIN"":""" & row("FECHA_FIN").ToString & """,")
                            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                            sb.Append("},")
                        Next
                        sb.Append("{}")
                        sb.Replace(",{}", "")
                        sb.Append("]")
                    End If
                    res = sb.ToString()
                Case "LISTAR_ORDENES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.CO.CORegistroCompras("BN").LISTAR_PROCESAMIENTO_SOLICITUD(CTLG_CODE, SCSL_CODE, "A", "")
                    If Not dt Is Nothing Then
                        sb.Append("[")
                        For Each row As DataRow In dt.Rows
                            sb.Append("{")
                            sb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                            sb.Append("""PRODUCTO"":""" & row("PRODUCTO").ToString & """,")
                            sb.Append("""TOTAL"":""" & row("TOTAL").ToString & """,")
                            sb.Append("""UNIDAD_MEDIDA"":""" & row("UNIDMEDIDAD").ToString & """,")
                            sb.Append("""FASE"":""" & row("FASE").ToString & """")
                            sb.Append("},")
                        Next
                        sb.Append("-")
                        sb.Replace("},-", "}")
                        sb.Append("]")
                    End If
                    res = sb.ToString()
                Case "LISTAR_FLOTAS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.AF.AFActivoFijo("BN").ListarActivosFijos("", "", CTLG_CODE, SCSL_CODE, "A")
                    If Not dt Is Nothing Then
                        sb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("TIPO_BIEN").ToString = "VEHICULO" Then
                                sb.Append("{")
                                sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                sb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                                sb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                                sb.Append("""BIEN"":""" & row("BIEN").ToString & """,")
                                sb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                                sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                                sb.Append("""TIPO_BIEN"":""" & row("TIPO_BIEN").ToString & """")
                                sb.Append("},")
                            End If
                        Next
                        sb.Append("-")
                        sb.Replace("},-", "}")
                        sb.Append("]")
                    End If
                    res = sb.ToString()
                Case "G"
                    context.Response.ContentType = "text/plain"
                    ORFL_CODE = context.Request("ORFL_CODE")
                    ORDEN_FLUJO = context.Request("ORDEN_FLUJO")
                    ACFI_CODE = context.Request("ACFI_CODE")
                    ACTIVO = context.Request("ACTIVO")
                    FECHA_INICIO = context.Request("FECHA_INICIO")
                    FECHA_FIN = context.Request("FECHA_FIN")
                    USUA_ID = context.Request("USUA_ID")
                    res = New Nomade.MP.MPAdministracionFlotas("BN").CrearAdmFlotas(CTLG_CODE, SCSL_CODE, ORFL_CODE, ORDEN_FLUJO, ACFI_CODE, ACTIVO, Utilities.fechaLocal(FECHA_INICIO), Utilities.fechaLocal(FECHA_FIN), USUA_ID)
                Case "A"
                    context.Response.ContentType = "text/plain"
                    ORFL_CODE = context.Request("ORFL_CODE")
                    ORDEN_FLUJO = context.Request("ORDEN_FLUJO")
                    ACFI_CODE = context.Request("ACFI_CODE")
                    ACTIVO = context.Request("ACTIVO")
                    FECHA_INICIO = context.Request("FECHA_INICIO")
                    FECHA_FIN = context.Request("FECHA_FIN")
                    ESTADO = context.Request("ESTADO")
                    USUA_ID = context.Request("USUA_ID")
                    res = New Nomade.MP.MPAdministracionFlotas("BN").ActualizarAdmFlotas(CODIGO, CTLG_CODE, SCSL_CODE, ORFL_CODE, ORDEN_FLUJO, ACFI_CODE, ACTIVO, Utilities.fechaLocal(FECHA_INICIO), Utilities.fechaLocal(FECHA_FIN), ESTADO, USUA_ID)
                Case "AE"
                    context.Response.ContentType = "text/plain"
                    USUA_ID = context.Request("USUA_ID")
                    res = New Nomade.MP.MPAdministracionFlotas("BN").CambiarEstadoAdmFlotas(CODIGO, USUA_ID)
            End Select
            
            context.Response.Write(res)
        Catch ex As Exception
            Console.Error.Write(ex.Message)
        End Try
        
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class