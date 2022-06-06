<%@ WebHandler Language="VB" Class="MPMCOFA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class MPMCOFA : Implements IHttpHandler

    Dim OPCION As String
    Dim dt As DataTable

    Dim CODIGO, CTLG_CODE, SCSL_CODE, USUA_ID As String
    Dim PROD_CODE, CANTIDAD, UNID_CODE, INSUMOS, UNIDADES, CANTIDADES, MERMAS As String
    Dim P_CODE, P_CODE_ORDEN, P_CODEFABR, P_CODE_DETALLE_FLUJO, P_USUARIO, P_CODE_PROD, P_FECHAINI, P_FECHAFIN, P_CODE_DETALLE, P_TIPO As String


    Dim resb As New StringBuilder()
    Dim res As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        P_CODE = context.Request("P_CODE")
        P_CODE_PROD = context.Request("P_CODE_PROD")
        P_FECHAINI = context.Request("P_FECHAINI")
        P_FECHAFIN = context.Request("P_FECHAFIN")
        P_TIPO = context.Request("P_TIPO")
        OPCION = context.Request("OPCION")
        P_CODE_DETALLE = context.Request("P_CODE_DETALLE")
        P_CODEFABR = context.Request("P_CODEFABR")
        P_CODE_DETALLE_FLUJO = context.Request("P_CODE_DETALLE_FLUJO")
        P_CODE_ORDEN = context.Request("P_CODE_ORDEN")
        P_USUARIO = context.Request("P_USUARIO")
        Try
            Select Case OPCION

                Case "1"
                    'context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").FTV_LISTAR_CIERRE_PRODUCCION(P_CODE, P_CODE_PROD, P_TIPO, Utilities.fechaLocal(P_FECHAINI), Utilities.fechaLocal(P_FECHAFIN))

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""PIDM_RESPONSABLE"" :" & """" & MiDataRow("PIDM_RESPONSABLE").ToString & """,")
                            resb.Append("""NRO_ORDEN"" :" & """" & MiDataRow("NRO_ORDEN").ToString & """,")
                            resb.Append("""RESPONSABLE"" :" & """" & MiDataRow("RESPONSABLE").ToString & """,")
                            resb.Append("""TIPO_FABRICACION"" :" & """" & MiDataRow("TIPO_FABRICACION").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""CANTIDAD_TOTAL"" :" & """" & MiDataRow("CANTIDAD_TOTAL").ToString & """,")
                            resb.Append("""CODE_LOTE"" :" & """" & MiDataRow("CODE_LOTE").ToString & """,")
                            resb.Append("""FECHA_LOTE_INI"" :" & """" & MiDataRow("FECHA_LOTE_INI").ToString & """,")
                            resb.Append("""FECHA_LOTE_FIN"" :" & """" & MiDataRow("FECHA_LOTE_FIN").ToString & """,")
                            resb.Append("""RESPONSABLE"" :" & """" & MiDataRow("RESPONSABLE").ToString & """")

                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2"

                    Dim dtCorreo As DataTable

                    dtCorreo = New Nomade.MP.MPOrdenFabricacion("BN").CORREO_JEFE_PRODUCCION("JPRO")
                    If Not (dtCorreo Is Nothing) Then
                        
                        dt = New Nomade.MP.MPOrdenFabricacion("BN").FTV_LISTAR_CIERRE_PRODUCCION(P_CODE_ORDEN, "", 1, Convert.ToDateTime(TimeOfDay), Convert.ToDateTime(TimeOfDay))
                        Dim CORREO As String = GenerarTabla(dt)

                        Dim dtpidm As DataTable = New Nomade.MP.MPOrdenFabricacion("BN").DEVULVE_PIDM_USUARIO(P_USUARIO)
                        Dim orde As New Nomade.CO.CORegistroCompras("Bn")
                        Dim dtCorreusuario = orde.LISTAR_DEVULVE_CORREO(dtpidm.Rows(0)("PIDM").ToString())

                        Dim mail As New Nomade.Mail.NomadeMail("BN")
                        mail.enviar(dtCorreusuario.Rows(0)("CORREO").ToString(), P_USUARIO, dtCorreo.Rows(0)("correo"), "Cierre de Orden de Produccion Nro. " & " " & P_CODE_ORDEN, "<p>Cierre de Orden de Produccion Nro. """ + P_CODE_ORDEN + """</p>" & CORREO)
                        res = New Nomade.MP.MPOrdenFabricacion("BN").CrearCierre(P_CODE_ORDEN)
                    Else
                        res = "no"
                    End If


                Case "3"
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").ListarOrdenFabricacion("", CTLG_CODE, SCSL_CODE, "0", "0", "A", P_CODEFABR)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            If MiDataRow("CORE_IND").ToString = "1" Then
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                resb.Append("""NRO_ORDEN"" :" & """" & MiDataRow("NRO_ORDEN").ToString & """,")
                                resb.Append("""RESPONSABLE"" :" & """" & MiDataRow("RESPONSABLE").ToString & """,")
                                resb.Append("""TIPO_FABRICACION"" :" & """" & MiDataRow("TIPO_FABRICACION").ToString & """,")
                                resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                                resb.Append("""CANTIDAD_TOTAL"" :" & """" & MiDataRow("CANTIDAD_TOTAL").ToString & """,")
                                resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                                resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                                resb.Append("""FECHA_REGISTRO"" :" & """" & MiDataRow("FECHA_REGISTRO").ToString & """,")
                                resb.Append("""CORE_IND"" :" & """" & MiDataRow("CORE_IND").ToString & """,")
                                resb.Append("""UNIDAD_MEDIDA"" :" & """" & MiDataRow("UNIDAD_MEDIDA").ToString & """")
                                resb.Append("},")
                            End If


                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4"

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
    Public Function GenerarTabla(ByVal dt As DataTable) As String

        If Not dt Is Nothing Then
            res = "<table style border='1'>"


            res += "<tr style='background-color: rgb(35, 119, 155); color: white;'>"
            res += "<td colspan='4' ></td>"
            res += "<td colspan='2'>Programacion</td>"
            res += "<td></td>"

            res += "</tr>"
            res += "<tr style='background-color: rgb(35, 119, 155); color: white;'>"
            res += "<td >Orden Fabricacion</td>"
            res += "<td >Producto</td>"
            res += "<td >Cantidad</td>"
            res += "<td >Lote</td>"
            res += "<td>Fecha Inicio</td>"
            res += "<td>Fecha Fin</td>"
            res += "<td >Glosa</td>"
            res += "</tr>"

            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr>"

                res += "<td align='center'>" & dt.Rows(i)("NRO_ORDEN").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PRODUCTO").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("CANTIDAD_TOTAL").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CODE_LOTE").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("FECHA_LOTE_INI").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FECHA_LOTE_FIN").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</td>"
                res += "</tr>"

                'resb.Append("{")
                'resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                'resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                'resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                'resb.Append("""PROD_CODE"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                'resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                'resb.Append("""PIDM_RESPONSABLE"" :" & """" & MiDataRow("PIDM_RESPONSABLE").ToString & """,")
                'resb.Append("""NRO_ORDEN"" :" & """" & MiDataRow("NRO_ORDEN").ToString & """,")
                'resb.Append("""RESPONSABLE"" :" & """" & MiDataRow("RESPONSABLE").ToString & """,")
                'resb.Append("""TIPO_FABRICACION"" :" & """" & MiDataRow("TIPO_FABRICACION").ToString & """,")
                'resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                'resb.Append("""CANTIDAD_TOTAL"" :" & """" & MiDataRow("CANTIDAD_TOTAL").ToString & """,")
                'resb.Append("""CODE_LOTE"" :" & """" & MiDataRow("CODE_LOTE").ToString & """,")
                'resb.Append("""FECHA_LOTE_INI"" :" & """" & MiDataRow("FECHA_LOTE_INI").ToString & """,")
                'resb.Append("""FECHA_LOTE_FIN"" :" & """" & MiDataRow("FECHA_LOTE_FIN").ToString & """,")
                'resb.Append("""RESPONSABLE"" :" & """" & MiDataRow("RESPONSABLE").ToString & """")


            Next
            res += "</tbody>"


            res += "</table>"

        End If
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class