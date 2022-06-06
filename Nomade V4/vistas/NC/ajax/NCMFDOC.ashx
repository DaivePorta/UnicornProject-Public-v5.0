<%@ WebHandler Language="VB" Class="NCMFDOC" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NCMFDOC : Implements IHttpHandler

    Dim OPCION As String

    Dim CTLG_CODE, SCSL_CODE, DCTO_CODE, IMPR_CODE, NROITMS, ESPACIOITMS, MARGX, MARGY, DESCRIPCION As String

    Dim FORM_CODE, ESTADOF As String

    Dim NOM_CAMPO, TIPO_LETRA, TAM_LETRA, VALORX, VALORY, TAM_MAXIMO, DESC_DET, DET_CODE As String

    Dim TIPO, ESTILO_LETRA, VALOR, CAMPO_ASOCIADO, RED, GREEN, BLUE, ALIGN_LETRA, CONV_LETRAS_IND As String

    Dim fromato As New Nomade.Impresion.Formato("BN")

    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    Dim IMG As HttpPostedFile
    Dim RUTA_IMG As String = ""
    Dim ALTO As String
    Dim ANCHO As String
    Dim UNME As String
    Dim p_CODE As String


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        DCTO_CODE = context.Request("DCTO_CODE")
        IMPR_CODE = context.Request("IMPR_CODE")
        p_CODE = context.Request("p_CODE")
        NROITMS = context.Request("NROITMS")
        ESPACIOITMS = context.Request("ESPACIOITMS")
        MARGX = context.Request("MARGX")
        MARGY = context.Request("MARGY")
        DESCRIPCION = context.Request("DESCRIPCION")
        FORM_CODE = context.Request("FORM_CODE")
        ESTADOF = context.Request("ESTADOF")
        NOM_CAMPO = context.Request("NOM_CAMPO")
        TIPO_LETRA = context.Request("TIPO_LETRA")
        TAM_LETRA = context.Request("TAM_LETRA")
        VALORX = context.Request("VALORX")
        VALORY = context.Request("VALORY")
        TAM_MAXIMO = context.Request("TAM_MAXIMO")
        DESC_DET = context.Request("DESC_DET")
        DET_CODE = context.Request("DET_CODE")


        TIPO = context.Request("TIPO")
        ESTILO_LETRA = context.Request("ESTILO_LETRA")
        VALOR = context.Request("VALOR")
        CAMPO_ASOCIADO = context.Request("CAMPO_ASOCIADO")

        RED = context.Request("RED")
        GREEN = context.Request("GREEN")
        BLUE = context.Request("BLUE")
        ALTO = context.Request("ALTO")
        ANCHO = context.Request("ANCHO")
        UNME = context.Request("UNME")
        ALIGN_LETRA = context.Request("ALIGN_LETRA")
        CONV_LETRAS_IND = context.Request("CONV_LETRAS_IND")
        IMG = context.Request.Files("IMG")


        Select Case OPCION
            Case "G"
                context.Response.ContentType = "application/json; charset=utf-8"

                If Not IMG Is Nothing Then
                    RUTA_IMG = GrabaImagen(IMG, context, "IMG_" & CTLG_CODE & "_" & DCTO_CODE & ".jpg")
                End If

                Dim array As Array
                array = fromato.RegistraFormatoimp(CTLG_CODE, SCSL_CODE, DCTO_CODE, IMPR_CODE, DESCRIPCION, NROITMS, ESPACIOITMS, MARGX, MARGY, ANCHO, ALTO, UNME, RUTA_IMG)
                If Not (array Is Nothing) Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & array(0) & """,")
                    resb.Append("""SUCCESS"" :" & """" & array(1) & """")
                    resb.Append("}")
                    resb.Append("]")

                    res = resb.ToString()
                Else
                    res = "FALLO"
                End If

            Case "A"
                context.Response.ContentType = "application/json; charset=utf-8"
                If Not IMG Is Nothing Then
                    If IMG.ContentLength > 0 Then
                        RUTA_IMG = GrabaImagen(IMG, context, "IMG_" & CTLG_CODE & "_" & DCTO_CODE & ".jpg")
                    Else
                        RUTA_IMG = IMG.FileName
                    End If

                End If
                Dim array As Array
                array = fromato.ActualizarFormatoimp(FORM_CODE, CTLG_CODE, SCSL_CODE, DCTO_CODE, IMPR_CODE, DESCRIPCION, NROITMS, ESPACIOITMS, MARGX, MARGY, ESTADOF, ANCHO, ALTO, UNME, RUTA_IMG)
                If Not (array Is Nothing) Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """" & array(0) & """")
                    resb.Append("}")
                    resb.Append("]")

                    res = resb.ToString()
                Else
                    res = "FALLO"
                End If
            Case "GD"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim array As Array
                array = fromato.RegistraDetalleFormatoimp(FORM_CODE, NOM_CAMPO, VALORX, VALORY, TAM_MAXIMO, DESC_DET, TIPO_LETRA, TAM_LETRA, TIPO, CAMPO_ASOCIADO, VALOR, ESTILO_LETRA, RED, GREEN, BLUE, ALIGN_LETRA, CONV_LETRAS_IND)
                If Not (array Is Nothing) Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """" & array(0) & """,")
                    resb.Append("""CODIGO"" :" & """" & array(1) & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Else
                    res = "FALLO"
                End If
            Case "DLDT"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim array As Array
                array = fromato.EliminarDetalleFormatoimp(DET_CODE)
                If Not (array Is Nothing) Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """" & array(0) & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Else
                    res = "FALLO"
                End If

            Case "LD"
                context.Response.ContentType = "application/json; charset=utf-8"

                dt = fromato.ListarDetalleFormato(DET_CODE, FORM_CODE, "")
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                        resb.Append("""GTFMDOC_CODE"":""" & row("GTFMDOC_CODE").ToString & """,")
                        resb.Append("""NOMBRE_CAMPO"":""" & row("NOMBRE_CAMPO").ToString & """,")
                        resb.Append("""VALOR_X"":""" & row("VALOR_X").ToString & """,")
                        resb.Append("""VALOR_Y"":""" & row("VALOR_Y").ToString & """,")
                        resb.Append("""LONG_MAXIMA"":""" & row("LONG_MAXIMA").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                        resb.Append("""TIPO_LETRA"":""" & row("TIPO_LETRA").ToString & """,")
                        resb.Append("""TAMANIO_LETRA"":""" & row("TAMANIO_LETRA").ToString & """,")
                        resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                        resb.Append("""CAMPO_ASOCIADO"":""" & row("CAMPO_ASOCIADO").ToString & """,")
                        resb.Append("""VALOR"":""" & row("VALOR").ToString & """,")
                        resb.Append("""ESTILO_LETRA"":""" & row("ESTILO_LETRA").ToString & """,")
                        resb.Append("""RED"":""" & row("RED").ToString & """,")
                        resb.Append("""GREEN"":""" & row("GREEN").ToString & """,")
                        resb.Append("""BLUE"":""" & row("BLUE").ToString & """,")
                        resb.Append("""COLOR"":""" & row("RED").ToString & "," & row("GREEN").ToString & "," & row("BLUE").ToString & """,")
                        resb.Append("""ALIGN_LETRA"":""" & row("ALIGN_LETRA").ToString & """,")
                        resb.Append("""CONV_LET_IND"":""" & row("CONV_LET_IND").ToString & """,")
                        resb.Append("""ESTADO_IND"":""" & row("ESTADO_IND").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                Else
                    res = "FALLO"
                End If
                resb.Append("]")
                res = resb.ToString()


            Case "LDCE" 'LISTA SOLO CAMPOS ESTATICOS REGISTRADOS
                context.Response.ContentType = "application/json; charset=utf-8"

                Dim tipo_campo As String
                If TIPO.Equals("E") Then
                    tipo_campo = "N" 'NO DEVUELVE VALORES
                Else
                    tipo_campo = "E"  'DEVUELVE SOLO CAMPOS ESTATICOS
                End If

                dt = fromato.ListarDetalleFormato("", FORM_CODE, tipo_campo)
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                        resb.Append("""GTFMDOC_CODE"":""" & row("GTFMDOC_CODE").ToString & """,")
                        resb.Append("""NOMBRE_CAMPO"":""" & row("NOMBRE_CAMPO").ToString & """,")
                        resb.Append("""VALOR_X"":""" & row("VALOR_X").ToString & """,")
                        resb.Append("""VALOR_Y"":""" & row("VALOR_Y").ToString & """,")
                        resb.Append("""LONG_MAXIMA"":""" & row("LONG_MAXIMA").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                        resb.Append("""TIPO_LETRA"":""" & row("TIPO_LETRA").ToString & """,")
                        resb.Append("""TAMANIO_LETRA"":""" & row("TAMANIO_LETRA").ToString & """,")
                        resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                        resb.Append("""CAMPO_ASOCIADO"":""" & row("CAMPO_ASOCIADO").ToString & """,")
                        resb.Append("""VALOR"":""" & row("VALOR").ToString & """,")
                        resb.Append("""ESTILO_LETRA"":""" & row("ESTILO_LETRA").ToString & """,")
                        resb.Append("""RED"":""" & row("RED").ToString & """,")
                        resb.Append("""GREEN"":""" & row("GREEN").ToString & """,")
                        resb.Append("""BLUE"":""" & row("BLUE").ToString & """,")
                        resb.Append("""COLOR"":""" & row("RED").ToString & "," & row("GREEN").ToString & "," & row("BLUE").ToString & """,")
                        resb.Append("""ALIGN_LETRA"":""" & row("ALIGN_LETRA").ToString & """,")
                        resb.Append("""ESTADO_IND"":""" & row("ESTADO_IND").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                Else
                    res = "FALLO"
                End If
                resb.Append("]")
                res = resb.ToString()

            Case "LF"
                context.Response.ContentType = "application/json; charset=utf-8"

                dt = fromato.ListarFormatoDcto(FORM_CODE, CTLG_CODE, SCSL_CODE, If(DCTO_CODE Is Nothing, "", DCTO_CODE))
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                        resb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                        resb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                        resb.Append("""DCTO_CODE"":""" & row("DCTO_CODE").ToString & """,")
                        resb.Append("""IMPR_CODE"":""" & row("IMPR_CODE").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                        resb.Append("""NRO_ITEMS"":""" & row("NRO_ITEMS").ToString & """,")
                        resb.Append("""ESPACIO_ITEMS"":""" & row("ESPACIO_ITEMS").ToString & """,")
                        resb.Append("""MARGEN_X"":""" & row("MARGEN_X").ToString & """,")
                        resb.Append("""MARGEN_Y"":""" & row("MARGEN_Y").ToString & """,")
                        resb.Append("""DESC_DCTO"":""" & row("DESC_DCTO").ToString & """,")
                        resb.Append("""CTLG_DESC"":""" & row("CTLG_DESC").ToString & """,")
                        resb.Append("""SCSL_DESC"":""" & row("SCSL_DESC").ToString & """,")
                        resb.Append("""IMPRESORA"":""" & row("IMPRESORA").ToString & """,")
                        resb.Append("""IMG"":""" & row("IMG").ToString & """,")
                        resb.Append("""ALTO"":""" & row("ALTO").ToString & """,")
                        resb.Append("""ANCHO"":""" & row("ANCHO").ToString & """,")
                        resb.Append("""UNME"":""" & row("UNME").ToString & """,")
                        resb.Append("""ESTADO_IND"":""" & row("ESTADO_IND").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                Else
                    res = "FALLO"
                End If
                resb.Append("]")
                res = resb.ToString()

            Case "LC"
                context.Response.ContentType = "application/json; charset=utf-8"

                dt = fromato.ListarProcedimientosFormatoDcto(DCTO_CODE)
                Dim procedimientos As Array
                Dim cadena_procedure As Array
                Dim procedimiento As String
                Dim nombre_procedimiento As String
                Dim nro_parametros As Integer
                Dim cadenaParametros As String = "0"
                Dim cadenaprocedimiento As String = ""
                Dim dtCampos As DataTable
                Dim campos As New ArrayList


                resb.Append("[")
                Dim index As Integer = 0
                Dim nro_prodecimientos As Integer = 0
                If Not (dt Is Nothing) And Not (dt.Rows(0)("PROCEDIMIENTOS").Equals("0")) Then
                    For Each row As DataRow In dt.Rows
                        procedimientos = row("PROCEDIMIENTOS").ToString.Split("|")
                        nro_prodecimientos = procedimientos.Length - 1
                        If (procedimientos.Length > 0) Then
                            For cont As Integer = 0 To nro_prodecimientos
                                procedimiento = procedimientos(cont)
                                cadena_procedure = procedimiento.Split(",")
                                If cadena_procedure.Length > 0 Then
                                    nombre_procedimiento = cadena_procedure(0)
                                    nro_parametros = cadena_procedure.Length - 1
                                    If nro_parametros >= 1 Then
                                        For c As Integer = 1 To nro_parametros
                                            If c = 1 Then
                                                cadenaParametros = cadena_procedure(c)
                                            Else
                                                cadenaParametros = cadenaParametros & "," & cadena_procedure(c)
                                            End If
                                        Next
                                    End If

                                    cadenaprocedimiento = nombre_procedimiento & "(" & cadenaParametros & ")"
                                    dtCampos = fromato.EjecutarProcedimientoFormatoDcto(cadenaprocedimiento)
                                    If Not (dtCampos Is Nothing) Then
                                        For Each col As DataColumn In dtCampos.Columns
                                            campos.Add(col.ColumnName)
                                        Next
                                    End If

                                End If


                            Next
                        End If

                    Next
                    If Not (campos Is Nothing) Then
                        If campos.Count > 0 Then
                            For ind As Integer = 0 To campos.Count - 1
                                resb.Append("{")
                                resb.Append("""CAMPO"":""" & campos(ind) & """")
                                resb.Append("},")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                        End If
                    Else
                        res = "NO HAY DATOS"
                    End If
                Else
                    res = "FALLO"
                End If
                resb.Append("]")
                res = resb.ToString()

            Case "UPD_CAMPO"
                context.Response.ContentType = "text/plain"
                Dim nmGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
                Dim nombreCampo As String = context.Request("columnName")
                Dim valor As String = context.Request("value")
                Dim id As String = context.Request("id")
                Try
                    Select Case nombreCampo
                        Case "VALOR X"
                            res = nmGestionProductos.ActualizarCampoGenerico("gtfddoc", "GTFDDOC_CODE", id, "GTFDDOC_VALOR_X", valor)
                        Case "VALOR Y"
                            res = nmGestionProductos.ActualizarCampoGenerico("gtfddoc", "GTFDDOC_CODE", id, "GTFDDOC_VALOR_Y", valor)
                        Case "TAMAÑO LETRA"
                            res = nmGestionProductos.ActualizarCampoGenerico("gtfddoc", "GTFDDOC_CODE", id, "GTFDDOC_TAMANIO_LETRA", valor)
                        Case "LONG. MAXIMA"
                            res = nmGestionProductos.ActualizarCampoGenerico("gtfddoc", "GTFDDOC_CODE", id, "GTFDDOC_LONG_MAXIMA", valor)

                        Case "TIPO LETRA"
                            res = nmGestionProductos.ActualizarCampoGenerico("gtfddoc", "GTFDDOC_CODE", id, "GTFDDOC_TIPO_LETRA", valor)
                        Case "ESTILO LETRA"
                            res = nmGestionProductos.ActualizarCampoGenerico("gtfddoc", "GTFDDOC_CODE", id, "GTFDDOC_ESTILO_LETRA", valor)
                        Case "ALINEACION"
                            res = nmGestionProductos.ActualizarCampoGenerico("gtfddoc", "GTFDDOC_CODE", id, "GTFDDOC_ALIGN_LETRA", valor)

                    End Select
                    res = valor.ToString
                Catch ex As Exception
                    res = ex.Message
                End Try

            Case "TEST_IMPR"
                Dim dtCabecera As DataTable = Nothing
                Dim dtDetalles As DataTable = Nothing


                If p_CODE.Substring(0, 1) = "V" Then ' es una venta

                    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    dtCabecera = nvVenta.ListarDocumentoVentaImpresion(p_CODE, "S", "")
                    dtDetalles = nvVenta.ListarDetalleDocumentoVentaImpresion(p_CODE, "S", "")

                ElseIf p_CODE.Substring(0, 1) = "A" Then ' es una salida naminsa - guia remision

                    Dim nvGuia As New Nomade.NA.NATipoMovimiento("Bn")
                    dtCabecera = nvGuia.ListarGuiaRemisionImpresion(p_CODE)
                    dtDetalles = nvGuia.ListarDetallGuiaRemisionImpresion(p_CODE)

                End If

                context.Response.ContentType = "application/json; charset=utf-8"

                If Not dtCabecera Is Nothing Then

                    res = "[{""cabecera"":" & Utilities.Datatable2Json(dtCabecera) & ",""detalle"":" & Utilities.Datatable2Json(dtDetalles) & "}]"
                Else
                    res = "[]"
                End If







                'Dim dtCabecera As New DataTable
                'Dim dtDetalles As New DataTable
                ''DCTO_CODE = "0012"
                'Dim p_CODE As String = "V00000024"

                'Try
                '    Select Case DCTO_CODE
                '        Case "0001", "0003", "0012"
                '            Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                '            dtCabecera = nvVenta.ListarDocumentoVentaImpresion(p_CODE, "", "")
                '            dtDetalles = nvVenta.ListarDetalleDocumentoVentaImpresion(p_CODE, "", "")

                '            Dim a As New Nomade.Impresion.Global()
                '            a.AgregarDetallesFormato(dtCabecera, dtDetalles, dtCabecera.Rows(0)("EMPRESA_CODE"), dtCabecera.Rows(0)("SUCURSAL_CODE"), dtCabecera.Rows(0)("DCTO_CODE"), "")


                '        Case Else
                '    End Select
                'Catch ex As Exception
                '    res = "ERROR: " + ex.Message
                'End Try

        End Select
        context.Response.Write(res)
    End Sub


    Public Function GrabaImagen(ByVal img As HttpPostedFile, ByVal context As HttpContext, ByVal nombrearch As String) As String
        Dim rp As String = String.Empty
        Try

            Dim savepath As String = "" 'path fisico del server
            Dim tempPath As String = "" 'path ../../ para src
            tempPath = System.Configuration.ConfigurationManager.AppSettings("PathImageDocumentosImprimir")
            savepath = context.Server.MapPath(tempPath)

            Dim filename As String = nombrearch

            If Not Directory.Exists(savepath) Then
                Directory.CreateDirectory(savepath)
            End If

            img.SaveAs(savepath & "\" & filename)
            rp = tempPath & "/" & filename
            context.Response.StatusCode = 200

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

        Return rp
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class