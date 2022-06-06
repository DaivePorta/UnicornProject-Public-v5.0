<%@ WebHandler Language="VB" Class="NCMRELA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMRELA : Implements IHttpHandler
    
    Dim dt As DataTable
    
    Dim res As String
    Dim sb As New StringBuilder()
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim OPCION = context.Request("OPCION")
        Dim CODIGO As String = context.Request("CODIGO")
        Dim DENOMINACION As String = context.Request("DENOMINACION")
        Dim ACRONIMO As String = context.Request("ACRONIMO")
        Dim TIEMPO_SERVICIOS As String = context.Request("TIEMPO_SERVICIOS")
        Dim ANIO_SERVICIOS As String = context.Request("ANIO_SERVICIOS")
        Dim JORNADA As String = context.Request("JORNADA")
        Dim DESPIDO As String = context.Request("DESPIDO")
        Dim VACACIONES As String = context.Request("VACACIONES")
        Dim USUA_ID As String = context.Request("USUA_ID")
        Dim ESTADO As String = context.Request("ESTADO")
        Dim PORC_CTS As String = context.Request("PORC_CTS")
         
        Select Case OPCION
            Case "S"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NC.NCRegimenLaboral("BN").ListarRegimenLaboral(CODIGO, IIf(ESTADO = Nothing, "", ESTADO))
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        sb.Append("""DENOMINACION"":""" & row("DENOMINACION").ToString & """,")
                        sb.Append("""ACRONIMO"":""" & row("ACRONIMO").ToString & """,")
                        sb.Append("""INDE_TIEMPO_SERV"":""" & row("INDE_TIEMPO_SERV").ToString & """,")
                        sb.Append("""INDE_ANIO_SERV"":""" & row("INDE_ANIO_SERV").ToString & """,")
                        sb.Append("""JORNADA_SEMANAL"":""" & row("JORNADA_SEMANAL").ToString & """,")
                        sb.Append("""PERIODO_SIN_DESPIDO"":""" & row("PERIODO_SIN_DESPIDO").ToString & """,")
                        sb.Append("""VACACIONES"":""" & row("VACACIONES").ToString & """,")
                        sb.Append("""PORC_CTS"":""" & row("PORC_CTS").ToString & """,")
                        sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("{}")
                    sb = sb.Replace(",{}", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "LISTAR_BENEFICIOS_REGLA"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NC.NCRegimenLaboral("BN").ListarBeneficiosRegimenLaboral(CODIGO)
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"": """ & row("BENSO_CODE").ToString & """,")
                        sb.Append("""DESCRIPCION"": """ & row("DESCRIPCION").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("{}")
                    sb = sb.Replace(",{}", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "LISTAR_BENEFICIOS"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NN.NNPlanilla("BN").Listar_Beneficios_sociales("", "A")
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"": """ & row("CODIGO").ToString & """,")
                        sb.Append("""DESCRIPCION"": """ & row("DESCRIPCION").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("{}")
                    sb = sb.Replace(",{}", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "AGREGAR_BENEFICIO"
                context.Response.ContentType = "text/plain"
                Dim BENSO_CODE As String = context.Request("BENSO_CODE")
                res = New Nomade.NC.NCRegimenLaboral("BN").AgregarBeneficio(CODIGO, BENSO_CODE, USUA_ID)
            Case "ELIMINAR_BENEFICIO"
                context.Response.ContentType = "text/plain"
                Dim BENSO_CODE As String = context.Request("BENSO_CODE")
                res = New Nomade.NC.NCRegimenLaboral("BN").EliminarBeneficio(CODIGO, BENSO_CODE)
            Case "G"
                context.Response.ContentType = "text/plain"
                Dim BENEFICIOS As String = context.Request("BENEFICIOS")
                context.Response.ContentType = "text/plain"
                res = New Nomade.NC.NCRegimenLaboral("BN").CrearRegimenLaboral(DENOMINACION.ToUpper, ACRONIMO.ToUpper, TIEMPO_SERVICIOS,
                                                                               ANIO_SERVICIOS, JORNADA, DESPIDO, VACACIONES, BENEFICIOS, USUA_ID, PORC_CTS)
            Case "A"
                context.Response.ContentType = "text/plain"
                res = New Nomade.NC.NCRegimenLaboral("BN").ActualizarRegimenLaboral(CODIGO, DENOMINACION, ACRONIMO, TIEMPO_SERVICIOS, ANIO_SERVICIOS,
                                                                                    JORNADA, DESPIDO, VACACIONES, ESTADO, USUA_ID, PORC_CTS)
            Case "AE"
                context.Response.ContentType = "text/plain"
                res = New Nomade.NC.NCRegimenLaboral("BN").CambiarEstadoRegimenLaboral(CODIGO, USUA_ID)
        End Select
        context.Response.Write(res)
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class