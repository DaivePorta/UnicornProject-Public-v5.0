<%@ WebHandler Language="VB" Class="NSMPLAN" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSMPLAN : Implements IHttpHandler
    Dim PlantillaHorario As New Nomade.NS.NSPlantillaHorario("Bn")
    Dim Opcion As String
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    Dim p_RHPLAHO_NOMBRE, p_RHPLAHO_ESTADO_IND, p_RHPLAHO_CTLG_CODE, p_RHPLAHO_USUA_ID,
     p_RHPLAHO_CODE, p_SALIDA As String
    
    
    
    Dim p_RHDEPL_CODE, p_RHDEPL_RHPLAHO_CODE, p_RHDEPL_SEQ, p_RHDEPL_HORA_INICIO,
    p_RHDEPL_HORA_FIN, p_RHDEPL_LUNES_IND, p_RHDEPL_MARTES_IND, p_RHDEPL_MIERCOLES_IND,
    p_RHDEPL_JUEVES_IND, p_RHDEPL_VIERNES_IND, p_RHDEPL_SABADO_IND, p_RHDEPL_DOMINGO_IND,
    p_RHDEPL_ZOHO_CODE, p_RHDEPL_ESTADO_IND, p_RHDEPL_USUA_ID As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        Opcion = context.Request("Opcion")
        p_RHPLAHO_NOMBRE = context.Request("p_RHPLAHO_NOMBRE")
        p_RHPLAHO_ESTADO_IND = context.Request("p_RHPLAHO_ESTADO_IND")
        p_RHPLAHO_CTLG_CODE = context.Request("p_RHPLAHO_CTLG_CODE")
        p_RHPLAHO_USUA_ID = context.Request("p_RHPLAHO_USUA_ID")
        p_RHPLAHO_CODE = context.Request("p_RHPLAHO_CODE")
        p_SALIDA = context.Request("p_SALIDA")
        
        p_RHDEPL_CODE = context.Request("p_RHDEPL_CODE")
        p_RHDEPL_RHPLAHO_CODE = context.Request("p_RHDEPL_RHPLAHO_CODE")
        p_RHDEPL_SEQ = context.Request("p_RHDEPL_SEQ")
        p_RHDEPL_HORA_INICIO = context.Request("p_RHDEPL_HORA_INICIO")
        p_RHDEPL_HORA_FIN = context.Request("p_RHDEPL_HORA_FIN")
        p_RHDEPL_LUNES_IND = context.Request("p_RHDEPL_LUNES_IND")
        p_RHDEPL_MARTES_IND = context.Request("p_RHDEPL_MARTES_IND")
        p_RHDEPL_MIERCOLES_IND = context.Request("p_RHDEPL_MIERCOLES_IND")
        p_RHDEPL_JUEVES_IND = context.Request("p_RHDEPL_JUEVES_IND")
        p_RHDEPL_VIERNES_IND = context.Request("p_RHDEPL_VIERNES_IND")
        p_RHDEPL_SABADO_IND = context.Request("p_RHDEPL_SABADO_IND")
        p_RHDEPL_DOMINGO_IND = context.Request("p_RHDEPL_DOMINGO_IND")
        p_RHDEPL_ZOHO_CODE = context.Request("p_RHDEPL_ZOHO_CODE")
        p_RHDEPL_ESTADO_IND = context.Request("p_RHDEPL_ESTADO_IND")
        p_RHDEPL_USUA_ID = context.Request("p_RHDEPL_USUA_ID")
       
        Select Case Opcion.ToString
            Case "CHP"
                res = PlantillaHorario.Crear_Plantilla_Horario(p_RHPLAHO_NOMBRE, p_RHPLAHO_ESTADO_IND, p_RHPLAHO_CTLG_CODE, p_RHPLAHO_USUA_ID)
            Case "EHP"
                res = PlantillaHorario.Editar_Plantilla_Horario(p_RHPLAHO_CODE, p_RHPLAHO_NOMBRE,
                                                                p_RHPLAHO_ESTADO_IND, p_RHPLAHO_USUA_ID, String.Empty)
                'Case "LHP"
                '    dt = PlantillaHorario.Listar_Plantilla_Horario(p_RHPLAHO_CODE, p_RHPLAHO_CTLG_CODE, p_RHPLAHO_ESTADO_IND)
                '    resb.Append("[")
                '    For Each MiDataRow As DataRow In dt.Rows
                '        resb.Append("{")
                '        resb.Append("""CODIGO"" :" & """" & MiDataRow("RHPLAHO_CODE").ToString & """,")
                '        resb.Append("""NOMBRE"" :" & """" & MiDataRow("RHPLAHO_NOMBRE").ToString & """,")
                '        resb.Append("""ESTADO"" :" & """" & MiDataRow("RHPLAHO_ESTADO_IND").ToString & """,")
                '        resb.Append("""USUARIO"" :" & """" & MiDataRow("RHPLAHO_USUA_ID").ToString & """")
                '        resb.Append("}")
                '        resb.Append(",")
                '    Next
                '    resb.Append("{}")
                '    resb = resb.Replace(",{}", String.Empty)
                '    resb.Append("]")
                '    res = resb.ToString()
            Case "CDHP"
                res = PlantillaHorario.Crear_Detalle_Plantilla_Horario(String.Empty, p_RHDEPL_RHPLAHO_CODE,
                                             p_RHDEPL_SEQ, p_RHDEPL_HORA_INICIO, p_RHDEPL_HORA_FIN, p_RHDEPL_LUNES_IND,
                                             p_RHDEPL_MARTES_IND, p_RHDEPL_MIERCOLES_IND, p_RHDEPL_JUEVES_IND, p_RHDEPL_VIERNES_IND,
                                             p_RHDEPL_SABADO_IND, p_RHDEPL_DOMINGO_IND, p_RHDEPL_ESTADO_IND,
                                             p_RHDEPL_USUA_ID)
            Case "EDHP"
                res = PlantillaHorario.Eliminar_Detalle_Plantilla_Horario(p_RHDEPL_CODE, String.Empty)
            Case "LDHP"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = PlantillaHorario.Listar_Detalle_Plantilla_Horario(p_RHDEPL_RHPLAHO_CODE)
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("RHDEPLA_CODE").ToString & """,")
                        resb.Append("""PADRE"" :" & """" & MiDataRow("RHDEPLA_RHPLAHO_CODE").ToString & """,")
                        resb.Append("""SEQUEN"" :" & """" & MiDataRow("RHDEPLA_SEQ").ToString & """,")
                        resb.Append("""HORA_INICIO"" :" & """" & MiDataRow("RHDEPLA_HORA_INICIO").ToString & """,")
                        resb.Append("""HORA_FIN"" :" & """" & MiDataRow("RHDEPLA_HORA_FIN").ToString & """,")
                        resb.Append("""LUNES"" :" & """" & pfdevuelvoIcono(MiDataRow("RHDEPLA_LUNES_IND").ToString) & """,")
                        resb.Append("""MARTES"" :" & """" & pfdevuelvoIcono(MiDataRow("RHDEPLA_MARTES_IND").ToString) & """,")
                        resb.Append("""MIERCOLES"" :" & """" & pfdevuelvoIcono(MiDataRow("RHDEPLA_MIERCOLES_IND").ToString) & """,")
                        resb.Append("""JUEVES"" :" & """" & pfdevuelvoIcono(MiDataRow("RHDEPLA_JUEVES_IND").ToString) & """,")
                        resb.Append("""VIERNES"" :" & """" & pfdevuelvoIcono(MiDataRow("RHDEPLA_VIERNES_IND").ToString) & """,")
                        resb.Append("""SABADO"" :" & """" & pfdevuelvoIcono(MiDataRow("RHDEPLA_SABADO_IND").ToString) & """,")
                        resb.Append("""DOMINGO"" :" & """" & pfdevuelvoIcono(MiDataRow("RHDEPLA_DOMINGO_IND").ToString) & """,")
                        resb.Append("""ESTADO"" :" & """" & MiDataRow("RHDEPLA_ESTADO_IND").ToString & """,")
                        resb.Append("""USUARIO"" :" & """" & MiDataRow("RHDEPLA_USUA_ID").ToString & """,")
                        resb.Append("""FECHA"" :" & """" & MiDataRow("RHDEPLA_FECHA_ACTV").ToString & """")
                      
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                End If
                'resb.Append(",")
            
                resb = resb.Replace(",{}", String.Empty)
                resb.Append("]")
                res = resb.ToString()
            Case "LHP"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = PlantillaHorario.Listar_Plantilla_Horario(p_RHPLAHO_CODE, p_RHPLAHO_CTLG_CODE,  String.Empty)
                resb.Append("[")
                For Each MiDataRow As DataRow In dt.Rows
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & MiDataRow("RHPLAHO_CODE").ToString & """,")
                    resb.Append("""NOMBRE"" :" & """" & MiDataRow("RHPLAHO_NOMBRE").ToString & """,")
                    resb.Append("""ESTADO"" :" & """" & MiDataRow("RHPLAHO_ESTADO_IND").ToString & """,")
                    resb.Append("""USUARIO"" :" & """" & MiDataRow("RHPLAHO_USUA_ID").ToString & """")
                    resb.Append("}")
                    resb.Append(",")
                Next
                resb.Append("{}")
                resb = resb.Replace(",{}", String.Empty)
                resb.Append("]")
                res = resb.ToString()
            Case "ZHO"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim z As New Nomade.NC.NCZonaHoraria("Bn")
                dt = z.Listar_ZonaHoraria(String.Empty, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("Zona_horaria").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                z = Nothing
            Case Else
                
        End Select
        context.Response.Write(res)
    End Sub
    Public Function pfdevuelvoIcono(ByVal cTexto As String) As String
        Dim cResultado As String = ""
        If cTexto = "S" Then
            cResultado = "<i class='icon-ok-sign' title='Sí'></i>"
        Else
            cResultado = "<i class='icon-ban-circle' title='No'></i>"
        End If
        Return cResultado
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class