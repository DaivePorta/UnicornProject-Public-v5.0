<%@ WebHandler Language="VB" Class="NOMRSPR" %>

Imports System
Imports System.Web
Imports System.Data


Public Class NOMRSPR : Implements IHttpHandler


    Dim code As String
    Dim opcion As String
    Dim p_alamcen, p_grupo, p_scl, p_UNME_DET, p_TIPO, p_mone_code, p_prd, p_moneda, p_TIPOD As String
    Dim total As Decimal
    Dim CODIGO, EMPRESA, CTLG_CODE, DESCRIPCION,
   TIPO_ALMACEN,
   TIPO_ALMACENAJE, DEPEND_CODE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS As String



    Dim dt, dtc, dtaux As DataTable
    Dim dtp As DataTable
    Dim p As New Nomade.NA.NASeccionesAlmacen("bn")
    Dim gPro As New Nomade.NM.NMGestionProductos("BN")
    Dim q As New Nomade.NC.NCCentroCostos("Bn")
    Dim usu As New Nomade.NS.NSUsuario("Bn")
    Dim Prod As New Nomade.NM.NMGestionProductos("Bn")
    Dim c As New Nomade.CO.CORegistroCompras("Bn")

    Dim res As String
    Dim resb As New StringBuilder
    Dim codempr As String
    Dim usua As String
    Dim p_area, p_seccion, p_proceso, p_usuario, p_detalle As String

    Dim tipoRequerimiento As String

    Dim P_ESTADOCABECE, p_REQUE, p_CLIENTE As String
    Dim p_SOLICITA As String
    Dim p_FECHA As String
    Dim p_PRIORIDAD As String
    Dim p_TIPOREQ As String

    Dim p_GLOSA As String
    Dim p_USUARIO1 As String
    Dim p_CATALOGO As String
    Dim p_CODIGO As String
    Dim p_ESTABLECIMIENTO As String
    Dim p_CODEUSU As String
    Dim p_CODEDETALLE As String
    Dim TEXTI As String
    Dim SERVICIO As String
    Dim P_ESTADO As String
    Dim P_CABEUSUARIO As String

    Dim P_APR_DETALLE As String

    Dim P_CODE_DETA As String
    Dim P_GLOSA_DETA, P_CODE, P_USU_APROBACION, P_ELIMINAR, P_COMPLETAR, CECC, CECD As String


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        tipoRequerimiento = context.Request("tipoRequerimiento")
        opcion = context.Request("OPCION")
        code = context.Request("code")
        CTLG_CODE = context.Request("CTLG_CODE")

        CODIGO = context.Request("CODIGO")
        EMPRESA = context.Request("EMPRESA")
        DEPEND_CODE = context.Request("DEPEND_CODE")

        p_area = context.Request("p_area")
        p_seccion = context.Request("p_seccion")
        p_proceso = context.Request("p_proceso")
        p_usuario = context.Request("p_usuario")

        P_ESTADOCABECE = context.Request("P_ESTADOCABECE")
        p_SOLICITA = context.Request("p_SOLICITA")
        p_FECHA = context.Request("p_FECHA")
        p_PRIORIDAD = context.Request("p_PRIORIDAD")
        p_TIPOREQ = context.Request("p_TIPOREQ")
        CECC = context.Request("CECC")
        CECD = context.Request("CECD")

        p_GLOSA = context.Request("p_GLOSA")
        p_USUARIO1 = context.Request("p_USUARIO1")
        p_CATALOGO = context.Request("p_CATALOGO")
        p_detalle = context.Request("p_detalle")
        p_ESTABLECIMIENTO = context.Request("p_ESTABLECIMIENTO")
        p_CODEUSU = context.Request("p_CODEUSU")
        p_CODEDETALLE = context.Request("p_CODEDETALLE")
        TEXTI = context.Request("TEXTI")
        SERVICIO = context.Request("SERVICIO")

        P_ESTADO = context.Request("P_ESTADO")

        P_CODE_DETA = context.Request("P_CODE_DETA")
        P_GLOSA_DETA = context.Request("P_GLOSA_DETA")

        P_APR_DETALLE = context.Request("P_APR_DETALLE")
        P_CABEUSUARIO = context.Request("P_CABEUSUARIO")

        p_TIPOD = context.Request("p_TIPOD")

        p_REQUE = context.Request("p_REQUE")
        p_CLIENTE = context.Request("p_CLIENTE")
        P_ELIMINAR = context.Request("P_ELIMINAR")
        P_COMPLETAR = context.Request("P_COMPLETAR")
        P_USU_APROBACION = context.Request("P_USU_APROBACION")
        P_CODE = context.Request("P_CODE")
        Try
            Select Case opcion
                Case "5"
                    dt = usu.DevuelveDatosUsuario(p_usuario)
                    res = dt.Rows(0)("NOMBRE").ToString()
                Case "6"
                    res = c.PFB_CREAR_REGISTRO_PRODUCCION(p_SOLICITA, p_FECHA, p_PRIORIDAD, p_TIPOREQ, CECC, CECD, p_GLOSA, p_CATALOGO, p_ESTABLECIMIENTO, p_REQUE, p_CLIENTE)
                    c.GRABAR_DETALLE_SOLIC_PRODUCCION(res, p_detalle)
                Case "7"

                Case "8"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = c.LISTAR_CABECERA_SOLIC_PRODUCCIOM(CTLG_CODE, p_ESTABLECIMIENTO, P_CABEUSUARIO)
                    resb.Append("[")
                    If Not dt Is Nothing Then
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                            resb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                            resb.Append("""SUCURSAL"":""" & row("ESTABLEC").ToString & """,")
                            resb.Append("""FECHA"":""" & row("FECHA").ToString & """,")
                            resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                            resb.Append("""USUARIO_APROBADO"":""" & row("USUARIO_APROBADO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                    End If
                    resb.Append("]")
                    resb.Replace("[{}]", "[]")
                    res = resb.ToString()
                Case "9"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = c.LISTAR_CABECERA_DEFINIADA_SOLIC_PRODUCC(p_CODEUSU)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                            resb.Append("""CATALOGO"":""" & row("CATALOGO").ToString & """,")
                            resb.Append("""ESTABLECIMIENTO"":""" & row("ESTABLE").ToString & """,")
                            resb.Append("""FECHA"":""" & row("FECHA").ToString & """,")
                            resb.Append("""SOLICITANTE"":""" & row("USUARIO").ToString & """,")
                            resb.Append("""PRIORIDAD"":""" & row("PRIORIDAD").ToString & """,")
                            resb.Append("""TIPOREQUE"":""" & row("TIPORQUE").ToString & """,")
                            resb.Append("""CCOSTO"":""" & row("CCOSTO").ToString & """,")
                            resb.Append("""CECC"":""" & row("CECC").ToString & """,")
                            resb.Append("""CECD"":""" & row("CECD").ToString & """,")
                            resb.Append("""COMPLETAR"":""" & row("COMPLETAR").ToString & """,")
                            resb.Append("""CLIENTE"":""" & row("CLIENTE").ToString & """,")
                            resb.Append("""IND_INTERNO"":""" & row("IND_INTERNO").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""USUARIO_APROBADO"":""" & row("USUARIO_APROBADO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("+")
                        resb.Replace(",+", "")
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "10"
                    dt = c.LISTAR_DETALLE_DEFINIDO_SOLIC_PROD(p_CODEDETALLE, P_ESTADO)
                    GenerarTabladETALLE(dt)
                Case "103"
                    Dim ress As String = c.DELETE_DETALLE_SOLICITUD_EDITAR(P_COMPLETAR)
                    If ress = "ok" Then
                        res = c.GRABAR_DETALLE_SOLIC_PRODUCCION(P_COMPLETAR, p_detalle)
                        If res = "OK" Then
                            c.COMPLETAR_SOLICITUD(P_COMPLETAR)
                        End If

                    Else
                        res = "No"
                    End If
                Case "102"
                    Dim ress As String = c.DELETE_DETALLE_SOLICITUD_EDITAR(P_ELIMINAR)
                    If ress = "ok" Then
                        res = c.GRABAR_DETALLE_SOLIC_PRODUCCION(P_ELIMINAR, p_detalle)
                    Else
                        res = "No"
                    End If
                Case "101"
                    dt = c.LISTAR_DETALLE_DEFINIDO_SOLIC_PROD(p_CODEDETALLE, P_ESTADO)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODE_PRODUCTO").ToString & """,")
                            resb.Append("""DES_PRODUCTO"":""" & row("DESCP").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDAD"":""" & row("UNIDAM").ToString & """,")
                            resb.Append("""CODIGO_MEDIDAD"":""" & row("CODE_UNID_MDI").ToString & """,")
                            resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                            resb.Append("""FECHA REQ"":""" & row("FECHA").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("+")
                        resb.Replace(",+", "")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "11"
                    res = c.MODIFICAR_DETALLE_GLOSA_REQUE_COMPRA(P_CODE_DETA, P_GLOSA_DETA)
                Case "12"
                    dt = c.LISTAR_DETALLE_DEFINIDO_SOLIC_PROD(p_CODEDETALLE, P_ESTADO)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            tipoRequerimiento = row("CODETEXTI").ToString()
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                            resb.Append("""NOMBRE"":""" & row("DESCP").ToString & """,")
                            resb.Append("""CANTIDAD_SOLI"":""" & row("CANTIDAD").ToString & """,")
                            resb.Append("""UNIDAD"":""" & row("UNIDAM").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "13"
                    res = c.DELETE_DETALLE_SOLIC_PROD(P_CODE_DETA)
                Case "14"
                    res = c.APROBACION_DETALLE_SOLIC_PRU(P_APR_DETALLE, P_USU_APROBACION, P_CODE)
                Case "15"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = c.LISTAR_CABECERA_SOLIC_PRODUCCIOM(CTLG_CODE, p_ESTABLECIMIENTO, P_CABEUSUARIO)
                    resb.Append("[")
                    If Not dt Is Nothing Then
                        For Each row As DataRow In dt.Rows
                            If row("ESTADO").ToString = "POR APROBAR" And row("COMPLETAR").ToString = "1" Then
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                                resb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                                resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                                resb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                                resb.Append("""SUCURSAL"":""" & row("ESTABLEC").ToString & """,")
                                resb.Append("""FECHA"":""" & row("FECHA").ToString & """,")
                                resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                                resb.Append("""USUARIO_APROBADO"":""" & row("USUARIO_APROBADO").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                    End If
                    resb.Append("]")
                    resb.Replace("[{}]", "[]")
                    res = resb.ToString()
                Case "SENDMAIL"
                    dt = c.LISTAR_DETALLE_DEFINIDO_SOLIC_PROD(p_CODEDETALLE, "1")
                    Dim detalle As String = GenerarTabladETALLE(dt)

                    context.Request.ContentType = "text/plain"
                    Dim mail As New Nomade.Mail.NomadeMail("BN")
                    Dim HTML_TABLA_CORREO As String = System.Configuration.ConfigurationManager.AppSettings("HTML_DETALLES_CORREO")

                    Dim remitente As String = context.Request("REMITENTE")
                    Dim nremitente As String = context.Request("NREMITENTE")
                    Dim destinatarios As String = context.Request("DESTINATARIOS")
                    Dim asunto As String = context.Request("ASUNTO")
                    Dim mensaje As String = context.Request("MENSAJE")
                    Dim empresa As String = context.Request("EMPRESA")
                    Dim solicitante As String = context.Request("SOLICITANTE")
                    Dim ESTABLE As String = context.Request("ESTABLECI")
                    Dim num_doc_origen As String = context.Request("NUM_DOC_ORIGEN")
                    Dim glosa As String = context.Request("GLOSA")

                    Dim Carea As String = context.Request("Carea")
                    Dim Cseccion As String = context.Request("Cseccion")
                    Dim Cproceso As String = context.Request("Cproceso")
                    Dim Cactividad As String = context.Request("Cactividad")

                    Dim CUERPO As String =
                    "<p>" & mensaje & "</p><hr>" &
                    "<h2>" & empresa & "</h2>" &
                     "<h2>" & ESTABLE & "</h2>" &
                    "<p><strong>SOLICITANTE:</strong> " & solicitante &
                    "<p><strong>Nro de Requisicion</strong> " & num_doc_origen & "</p>" &
                    "<p><strong>Centro de Costo</strong>  <b>Area:</b>" & Carea & "  -  <b>Seccion:</b>" & Cseccion & " -  <b>Proceso:</b>" & Cproceso & "  -  <b>Actividad:</b>" & Cactividad & "</p>" &
                    "<p><strong>GLOSA: </strong>" & glosa & "</p>" & detalle

                    mail.enviar(remitente, nremitente, destinatarios, asunto, CUERPO)
                    res = "OK"
            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Function GenerarTablaCorreo(ByVal dt As DataTable) As String
        Dim corro As String = ""
        If Not dt Is Nothing Then
            corro = "<table id=""tblbmodal"" class=""table table-bordered"" border=""0"">"
            corro += "<thead>"
            corro += "<tr>"
            corro += "<th style='text-align: center'>FECHA</th>"
            corro += "<th>PRODUCTO</th>"
            corro += "<th style='text-align: center'>CANTIDAD</th>"
            corro += "<th style='text-align: center'>CANT. APROBADA</th>"
            corro += "<th style='text-align: center'>CANT. POR ATENDER</th>"
            corro += "<th style='text-align: center'>UNID. DE MEDIDA</th>"
            corro += "<th style='text-align: center'>ESTADO</th>"
            corro += "<th>GLOSA</th>"
            corro += "</tr>"
            corro += "</thead>"
            corro += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                corro += "<tr >"
                corro += "<td style='text-align: center; width: 10%'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                corro += "<td>" & dt.Rows(i)("DESCP").ToString() & "</td>"
                corro += "<td style='text-align: center; width: 12%'>" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"
                corro += "<td style='text-align: center; width: 12%'>" & dt.Rows(i)("CANTIDAD_APROBADA").ToString() & "</td>"
                corro += "<td style='text-align: center; width: 12%'>" & dt.Rows(i)("CANTIDAD_RESTANTE").ToString() & "</td>"
                corro += "<td style='text-align: center; width: 18%'>" & dt.Rows(i)("UNIDAM").ToString() & "</td>"
                corro += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                corro += "<td align='center'>" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                corro += "</tr>"
            Next
            corro += "</tbody>"
            corro += "</table>"
        End If
        System.Configuration.ConfigurationManager.AppSettings("HTML_DETALLES_CORREO") = corro
        Return corro

    End Function

    Public Function GenerarTabladETALLE(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""table table-bordered"">"
            res += "<thead>"
            res += "<tr>"
            res += "<th style='text-align: center'>FECHA</th>"
            res += "<th>PRODUCTO</th>"
            res += "<th style='text-align: center'>CANTIDAD</th>"
            res += "<th style='text-align: center'>APROBADO</th>"
            res += "<th style='text-align: center'>UNID. MEDIDA</th>"
            res += "<th style='text-align: center'>ESTADO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("ESTADO").ToString() = "0" Then
                    res += "<tr style='background-color: #FFCC99' >"
                ElseIf dt.Rows(i)("ESTADO").ToString() = "2" Or dt.Rows(i)("ESTADO").ToString() = "3" Or dt.Rows(i)("ESTADO").ToString() = "4" Or dt.Rows(i)("ESTADO").ToString() = "5" Then
                    res += "<tr style='background-color: #CCFFFF'>"
                Else
                    res += "<tr >"
                End If
                res += "<td style='text-align: center; width: 10%'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DESCP").ToString() & "</td>"
                res += "<td style='text-align: center; width: 12%'>" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"
                res += "<td style='text-align: center; width: 12%'>" & dt.Rows(i)("CANTIDAD_APROBADA").ToString() & "</td>"
                res += "<td style='text-align: center; width: 18%'>" & dt.Rows(i)("UNIDAM").ToString() & "</td>"
                If dt.Rows(i)("ESTADO").ToString() = "1" Then
                    res += "<td style='text-align: center; width: 10%'>SOLICITADO</td>"
                End If
                If dt.Rows(i)("ESTADO").ToString() = "2" Then
                    res += "<td style='text-align: center; width: 10%'>APROBADO</td>"
                End If
                If dt.Rows(i)("ESTADO").ToString() = "3" Then
                    res += "<td style='text-align: center; width: 10%'>PROGRAMADO</td>"
                End If
                If dt.Rows(i)("ESTADO").ToString() = "4" Then
                    res += "<td style='text-align: center; width: 10%'>EJECUCION</td>"
                End If
                If dt.Rows(i)("ESTADO").ToString() = "0" Then
                    res += "<td style='text-align: center; width: 10%'>ANULADO</td>"
                End If
                If dt.Rows(i)("ESTADO").ToString() = "5" Then
                    res += "<td style='text-align: center; width: 10%'>TERMINADO</td>"
                End If
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function

    Public Function GenerarTablaProSinDatos() As String
        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
        res += "<tr >"
        res += "<td align='center'> </td>"
        res += "<td ></td>"
        res += "<td align='center'></td>"
        res += "<td align='center' >NO HAY DATOS DISPONIBLES</td>"
        res += "<td align='center'></td>"
        res += "<td align='center'></td>"
        res += "</tr>"
        res += "</tbody>"
        res += "</table>"
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class