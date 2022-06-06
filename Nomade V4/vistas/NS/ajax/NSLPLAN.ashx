<%@ WebHandler Language="VB" Class="NSLPLAN" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSLPLAN : Implements IHttpHandler
    Dim PlantillaHorario As New Nomade.NS.NSPlantillaHorario("Bn")
    Dim OPCION As String
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        Dim PlantillaHorario As New Nomade.NS.NSPlantillaHorario("Bn")
        Dim Opcion As String
        Dim dt As DataTable
        Dim res As String = "[]"
        Dim resb As New StringBuilder
        Dim p_RHPLAHO_NOMBRE, p_RHPLAHO_ESTADO_IND, p_RHPLAHO_CTLG_CODE, p_RHPLAHO_USUA_ID,
        p_RHPLAHO_CODE, p_SALIDA As String

        Opcion = context.Request("Opcion")
        p_RHPLAHO_NOMBRE = context.Request("p_RHPLAHO_NOMBRE")
        p_RHPLAHO_ESTADO_IND = context.Request("p_RHPLAHO_ESTADO_IND")
        p_RHPLAHO_CTLG_CODE = context.Request("p_RHPLAHO_CTLG_CODE")
        p_RHPLAHO_USUA_ID = context.Request("p_RHPLAHO_USUA_ID")
        p_RHPLAHO_CODE = context.Request("p_RHPLAHO_CODE")
        p_SALIDA = context.Request("p_SALIDA")

        Select Opcion.ToString
            'Case "CHP"
            '    res = PlantillaHorario.Crear_Plantilla_Horario(p_RHPLAHO_NOMBRE, p_RHPLAHO_ESTADO_IND, p_RHPLAHO_CTLG_CODE, p_RHPLAHO_USUA_ID)
            'Case "EHP"
            '    res = PlantillaHorario.Editar_Plantilla_Horario(p_RHPLAHO_CODE, p_RHPLAHO_NOMBRE,
            '                                                    p_RHPLAHO_ESTADO_IND, p_RHPLAHO_USUA_ID, p_SALIDA)
            Case "LHP"
                dt = PlantillaHorario.Listar_Plantilla_Horario(String.Empty, p_RHPLAHO_CTLG_CODE, String.Empty)
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("RHPLAHO_CODE").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("RHPLAHO_NOMBRE").ToString & """,")
                        'resb.Append("""ESTADO"" :" & """" & MiDataRow("RHPLAHO_ESTADO_IND").ToString & """,")
                        If MiDataRow("RHPLAHO_ESTADO_IND").ToString.Equals("A") Then
                            resb.Append("""ESTADO"" :" & """" & "ACTIVO" & """,")
                        Else
                            resb.Append("""ESTADO"" :" & """" & "INACTIVO" & """,")
                        End If
                        resb.Append("""USUARIO"" :" & """" & MiDataRow("RHPLAHO_USUA_ID").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                End If

                resb.Append("{}")
                resb = resb.Replace(",{}", String.Empty)
                resb.Append("]")
                res = resb.ToString()
            Case "LHP"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = PlantillaHorario.Listar_Plantilla_Horario(p_RHPLAHO_CODE, p_RHPLAHO_CTLG_CODE, "A")
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
        End Select
        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class