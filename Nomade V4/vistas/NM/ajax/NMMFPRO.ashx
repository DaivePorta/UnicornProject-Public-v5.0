<%@ WebHandler Language="VB" Class="NMMFPRO" %>


Imports System
Imports System.Web
Imports System.Data

Public Class NMMFPRO : Implements IHttpHandler

    Dim OPCION As String
    Dim USUARIO As String

    Dim SUBGRUP_CODE, CTLG_CODE, USUA_ID, DEPEND_CODE, DESC, CODE_EXIS, ESTADO_IND, GRUP_CODE, OPCION2, sconfigconta, p_OPERACION, p_PROD_CODE, p_CECC, p_CECD As String
    Dim p_DETALLES_MARCA, p_ISC_IND, p_ISC_CODE As String

    Dim r As New Nomade.NC.NCEmpresa("Bn")
    Dim g As New Nomade.NC.NCGrupos("Bn")
    Dim e As New Nomade.NM.NMTipodeExistencia("Bn")
    Dim c As New Nomade.NC.NCCuenta("Bn")
    Dim t As New Nomade.NM.NMTipoSistemaIsc("Bn")

    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim oTransaction As New Nomade.DataAccess.Transaccion()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        'COMENTARIO PUEBA
        OPCION2 = context.Request("OPCION2")
        OPCION = context.Request("OPCION")
        USUARIO = context.Request("USUARIO")
        DEPEND_CODE = context.Request("DEPEND_CODE")
        GRUP_CODE = context.Request("CODE")
        SUBGRUP_CODE = context.Request("SUBGRUP_CODE")
        CTLG_CODE = context.Request("CTLG_CODE")
        USUA_ID = context.Request("USUA_ID")
        DESC = vChar(context.Request("DESC"))
        CODE_EXIS = context.Request("CODE_EXIS")
        ESTADO_IND = context.Request("ESTADO_IND")
        sconfigconta = context.Request("sconfigconta")
        p_OPERACION = context.Request("p_OPERACION")
        p_PROD_CODE = context.Request("p_PROD_CODE")
        p_CECC = context.Request("p_CECC")
        p_CECD = context.Request("p_CECD")
        p_ISC_IND = context.Request("p_ISC_IND")
        p_ISC_CODE = context.Request("p_ISC_CODE")

        p_DETALLES_MARCA = context.Request("p_DETALLES_MARCA")

        Try

            Select Case OPCION
                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = r.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""AGENTE_RETEN_IND"" :" & """" & MiDataRow("AGENTE_RETEN_IND").ToString & """,")
                            resb.Append("""CORTO"" :" & """" & MiDataRow("CORTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "1"
                    context.Response.ContentType = "text/html"
                    dt = g.ListarGrupos_X_CTLG(String.Empty, CTLG_CODE, String.Empty)
                    res = GenerarHtmlGrupos("Grupos", "GRUPOS", dt)
                Case "2"
                    context.Response.ContentType = "text/html"
                    dt = g.dame_sgrupos(DEPEND_CODE, "NORMAL", 0, 0, "", CTLG_CODE)
                    res = GenerarHtmlSubGrupos("SubGrupo", "SUBGRUPOS", dt)
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = e.Listar_Existencias(String.Empty, String.Empty, "A", String.Empty)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "Descripcion", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""Codigo"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""Descripcion"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""ALMACENABLE_IND"" :" & """" & MiDataRow("ALMACENABLE_IND").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If (OPCION2.Equals("TX")) Then
                        dt = g.ListarGrupos_X_CTLG(CODE_EXIS, CTLG_CODE, "TX")
                    Else
                        dt = g.ListarGrupos_X_CTLG(String.Empty, CTLG_CODE, String.Empty)
                    End If

                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""ALMACENABLE_IND"" :" & """" & MiDataRow("ALMACENABLE_IND").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = c.Listar_cuentas(CTLG_CODE, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "Descripcion", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""Cod_Cuenta"" :" & """" & MiDataRow("Cod_Cuenta").ToString & """,")
                            resb.Append("""Descripcion"" :" & """" & MiDataRow("Descripcion").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "6"
                    'ME LISTA LOS SUBGRUPOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = g.dame_sgrupos(DEPEND_CODE, "NORMAL", 0, 0, "", CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "Descripcion", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""Codigo"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""Descripcion"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""ISC_CODE"" :" & """" & MiDataRow("ISC_CODE").ToString & """,")
                            resb.Append("""ISC_IND"" :" & """" & MiDataRow("ISC_IND").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "20" 'lista grupos y sub totales x ctlg
                    context.Response.ContentType = "text/html"
                    dt = g.lista_grupos_subgrupo_x_ctlg(CTLG_CODE)
                    res = GenerarHtmlGruSubTotales("gru_subgru", "GRUPOS / SUBGRUPOS", dt)
                Case "ESG"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    msg = EliminarGrupoSubGrupo(GRUP_CODE)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""MENSAJE"" :" & """" & msg.ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "EG"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    msg = EliminarGrupoSubGrupo(GRUP_CODE)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""MENSAJE"" :" & """" & msg.ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "NG" 'GRABAR GRUPO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    cod = GrabarGrupo(DESC, Nothing, CODE_EXIS, "", ESTADO_IND, USUA_ID, "", "", "", "", CTLG_CODE, "", p_CECC, p_CECD, "N", String.Empty)
                    ' IIf(cod <> "", msg = "OK", msg = "")
                    If (cod <> "") Then
                        msg = "OK"
                    Else
                        msg = ""
                    End If
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & cod.ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & msg.ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "AG" 'ACTUALIZAR GRUPO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    msg = ActualizarGrupo(GRUP_CODE, DESC, Nothing, CODE_EXIS, ESTADO_IND, USUA_ID, String.Empty, String.Empty,
                                          String.Empty, String.Empty, CTLG_CODE)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """" & msg.ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "ASG" 'ACTUALIZAR SUBGRUPO
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim oNCParametros As New Nomade.NC.NCParametros("Bn")
                    Dim oDT_Param As New DataTable()
                    oDT_Param = oNCParametros.ListarParametros("ECON", "")
                    If oDT_Param Is Nothing Then
                        Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    End If
                    If oDT_Param.Rows.Count = 0 Then
                        Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    End If
                    Dim sUsaContab As String = oDT_Param.Rows(0)("VALOR")


                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    msg = g.actualizar_grupo(SUBGRUP_CODE, DESC, GRUP_CODE, CODE_EXIS, ESTADO_IND, USUA_ID, String.Empty, String.Empty,
                                          String.Empty, String.Empty, p_DETALLES_MARCA, p_CECC, p_CECD, p_ISC_IND, p_ISC_CODE, CTLG_CODE, oTransaction)

                    If sUsaContab.Equals("S") Then
                        Dim dtx As DataTable = Utilities.JSONToDataTable(sconfigconta)

                        Dim dato2 As String = "OK"
                        If Not (dtx Is Nothing) Then
                            For i As Integer = 0 To dtx.Rows.Count - 1
                                'dato2 = g.insertar_sGrupoConfigContable(dtx(i)("operacion"), SUBGRUP_CODE, dtx(i)("idctagrup"), dtx(i)("ctasgrup"), dtx(i)("impuesto"),
                                '                                        dtx(i)("idctaimp"), dtx(i)("ctaimpuesto"), dtx(i)("idctaMN"), dtx(i)("ctaMN"),
                                '                                        dtx(i)("idctaME"), dtx(i)("ctaME"), dtx(i)("idRELMN"), dtx(i)("ctaRELMN"),
                                '                                        dtx(i)("idRELME"), dtx(i)("ctaRELME"), dtx(i)("debehaber"),
                                '                                        USUA_ID, "GENERAL", oTransaction)


                                dato2 = g.insertar_sGrupoConfigContable(dtx(i)("operacion"), SUBGRUP_CODE, dtx(i)("idctagrup"), dtx(i)("ctasgrup"), dtx(i)("debehaber"),
                                                                        USUA_ID, "GENERAL", oTransaction)
                            Next

                        End If

                        If dato2.Contains("OK") Then
                            oTransaction.fnCommitTransaction()
                            msg = "OK"
                        Else
                            oTransaction.fnRollBackTransaction()
                            msg = "ERROR2"
                        End If
                    Else
                        oTransaction.fnCommitTransaction()
                        msg = "OK"
                    End If

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """" & msg.ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "NSG"
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim oNCParametros As New Nomade.NC.NCParametros("Bn")
                    Dim oDT_Param As New DataTable()
                    oDT_Param = oNCParametros.ListarParametros("ECON", "")
                    If oDT_Param Is Nothing Then
                        Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    End If
                    If oDT_Param.Rows.Count = 0 Then
                        Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    End If
                    Dim sUsaContab As String = oDT_Param.Rows(0)("VALOR")

                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)
                    If p_ISC_CODE = "" Or p_ISC_CODE Is Nothing Then
                        p_ISC_CODE = String.Empty
                    End If

                    cod = g.insertar_grupo(DESC, GRUP_CODE, CODE_EXIS, "", ESTADO_IND, USUA_ID, "", "", "", "", CTLG_CODE, p_DETALLES_MARCA, p_CECC, p_CECD, p_ISC_IND, p_ISC_CODE, oTransaction)

                    If sUsaContab.Equals("S") Then
                        Dim dtx As DataTable = Utilities.JSONToDataTable(sconfigconta)
                        Dim dato2 As String = "OK"
                        If Not (dtx Is Nothing) Then
                            For i As Integer = 0 To dtx.Rows.Count - 1
                                'dato2 = g.insertar_sGrupoConfigContable(dtx(i)("operacion"), cod, dtx(i)("idctagrup"), dtx(i)("ctasgrup"), dtx(i)("impuesto"),
                                '                                        dtx(i)("idctaimp"), dtx(i)("ctaimpuesto"), dtx(i)("idctaMN"), dtx(i)("ctaMN"),
                                '                                        dtx(i)("idctaME"), dtx(i)("ctaME"), dtx(i)("idRELMN"), dtx(i)("ctaRELMN"),
                                '                                        dtx(i)("idRELME"), dtx(i)("ctaRELME"), dtx(i)("debehaber"),
                                '                                        USUA_ID, "GENERAL", oTransaction)

                                dato2 = g.insertar_sGrupoConfigContable(dtx(i)("operacion"), cod, dtx(i)("idctagrup"), dtx(i)("ctasgrup"), dtx(i)("debehaber"),
                                                                        USUA_ID, "GENERAL", oTransaction)
                            Next

                        End If

                        If dato2.Contains("OK") Then
                            oTransaction.fnCommitTransaction()
                            msg = "OK"
                        Else
                            oTransaction.fnRollBackTransaction()
                            msg = "ERROR2"
                        End If
                    Else
                        oTransaction.fnCommitTransaction()
                        msg = "OK"
                    End If


                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & cod.ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & msg.ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "LSCONT"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = g.lista_sGrupoConfigContable(p_OPERACION, SUBGRUP_CODE, IIf(p_PROD_CODE.Equals(String.Empty), "GENERAL", p_PROD_CODE))
                    If dt Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                Case "GUCONT"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dtx As DataTable = Utilities.JSONToDataTable(sconfigconta)

                    Dim cod As String = "OK"
                    Dim dato As String = "OK"
                    If Not (dtx Is Nothing) Then
                        For i As Integer = 0 To dtx.Rows.Count - 1
                            'cod = g.insertar_sGrupoConfigContable(dtx(i)("operacion"), SUBGRUP_CODE, dtx(i)("idctagrup"), dtx(i)("ctasgrup"), dtx(i)("impuesto"),
                            '                                      dtx(i)("idctaimp"), dtx(i)("ctaimpuesto"), dtx(i)("idctaMN"), dtx(i)("ctaMN"),
                            '                                      dtx(i)("idctaME"), dtx(i)("ctaME"), dtx(i)("idRELMN"), dtx(i)("ctaRELMN"), dtx(i)("idRELME"),
                            '                                      dtx(i)("ctaRELME"), dtx(i)("debehaber"), USUA_ID, dtx(i)("producto"))

                            cod = g.insertar_sGrupoConfigContable(dtx(i)("operacion"), SUBGRUP_CODE, dtx(i)("idctagrup"), dtx(i)("ctasgrup"), dtx(i)("debehaber"), USUA_ID, dtx(i)("producto"))
                        Next
                        If cod.Contains("ERROR") Then
                            dato = "ERROR"
                        Else
                            dato = "OK"
                        End If

                    End If

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & cod.ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & dato.ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "EDCONT"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    Dim dtx As DataTable = Utilities.JSONToDataTable(sconfigconta)

                    Dim cod As String = "OK"
                    Dim dato As String = "OK"
                    If Not (dtx Is Nothing) Then
                        For i As Integer = 0 To dtx.Rows.Count - 1
                            'Deshabilitar configuración contable - ERICK (13/02/2018)
                            '                                       cod = g.insertar_sGrupoConfigContable(dtx(i)("operacion"), SUBGRUP_CODE, dtx(i)("idctagrup"), dtx(i)("ctasgrup"), dtx(i)("impuesto"),
                            '                                       dtx(i)("idctaimp"), dtx(i)("ctaimpuesto"), dtx(i)("idctaMN"), dtx(i)("ctaMN"),
                            '                                       dtx(i)("idctaME"), dtx(i)("ctaME"), dtx(i)("idRELMN"), dtx(i)("ctaRELMN"),
                            '                                       dtx(i)("idRELME"), dtx(i)("ctaRELME"), dtx(i)("debehaber"),
                            '                                       USUA_ID, dtx(i)("producto"), oTransaction)

                            cod = g.insertar_sGrupoConfigContable(dtx(i)("operacion"), SUBGRUP_CODE, dtx(i)("idctagrup"), dtx(i)("ctasgrup"), dtx(i)("debehaber"),
                                                                    USUA_ID, dtx(i)("producto"), oTransaction)
                        Next
                        If cod.Contains("ERROR") Then
                            oTransaction.fnRollBackTransaction()
                            dato = "ERROR"
                        Else
                            oTransaction.fnCommitTransaction()
                            dato = "OK"
                        End If

                    End If

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & cod.ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & dato.ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "LISC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = t.ListarTipoSistemasIsc(String.Empty)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case Else

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            If oTransaction.iTransactionState = NOMADE.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
            Dim sMsjeError As String = ex.Message
            If (sMsjeError.IndexOf("[Advertencia]") > -1) Then
                context.Response.Write(sMsjeError)
            Else
                context.Response.Write("[Error]: " + sMsjeError)
            End If
        End Try

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    'Public Function GrabarCentroCostosCabecera(ByVal p_PTVCECC_CTLG_CODE As String, ByVal p_PTVCECC_NIVELES As Integer, _
    '                                            ByVal p_PTVCECC_NIVEL1 As String, ByVal p_PTVCECC_NIVEL1_DIG As Integer, _
    '                                            ByVal p_PTVCECC_NIVEL2 As String, ByVal p_PTVCECC_NIVEL2_DIG As Integer, _
    '                                            ByVal p_PTVCECC_NIVEL3 As String, ByVal p_PTVCECC_NIVEL3_DIG As Integer, _
    '                                            ByVal p_PTVCECC_NIVEL4 As String, ByVal p_PTVCECC_NIVEL4_DIG As Integer, _
    '                                            ByVal p_PTVCECC_ESTADO_IND As String, ByVal p_PTVCECC_USUA_ID As String) As Array
    '    Dim datos(2) As String
    '    datos = q.Crear_CentroCostos_Cabecera(p_PTVCECC_CTLG_CODE, p_PTVCECC_NIVELES, p_PTVCECC_NIVEL1, p_PTVCECC_NIVEL1_DIG, 
    '                                             p_PTVCECC_NIVEL2, p_PTVCECC_NIVEL2_DIG, p_PTVCECC_NIVEL3, p_PTVCECC_NIVEL3_DIG, 
    '                                             p_PTVCECC_NIVEL4, p_PTVCECC_NIVEL4_DIG, p_PTVCECC_ESTADO_IND, p_PTVCECC_USUA_ID)
    '    Return datos
    'End Function

    Public Function GrabarGrupo(ByVal p_grup_desc As String, ByVal p_depend_code As String, ByVal p_texi_code As String,
                                  ByVal p_tatr_code As String, ByVal p_estado_ind As String, ByVal p_USUA_ID As String,
                                  ByVal p_MS_IND As String, ByVal p_MN_IND As String, ByVal p_SE_IND As String,
                                  ByVal p_MA_IND As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, p_Centro_Costo_Cab As String,
                                  p_Centro_Costo_Det As String, ByVal p_ISC_IND As String, ByVal p_ISC_CODE As String) As String
        Dim dato As String
        dato = g.insertar_grupo(p_grup_desc, p_depend_code, p_texi_code, p_tatr_code, p_estado_ind, p_USUA_ID, p_MS_IND, p_MN_IND, p_SE_IND,
                                 p_MA_IND, p_CTLG_CODE, "", p_Centro_Costo_Cab, p_Centro_Costo_Det, p_ISC_IND, p_ISC_CODE)

        Return dato
    End Function

    'Public Function ActualizarSgrupConta(ByVal p_OPERACION As String, ByVal p_SUBGRUPO As String, ByVal p_CUENTA_SGRUP As String,
    '                                 ByVal p_IMPUESTO As String, ByVal p_CUENTA_IMPUESTO As String, ByVal p_CUENTA_OPE_MN As String,
    '                                 ByVal p_CUENTA_OPE_ME As String, ByVal p_CUENTA_RELA_OPE_MN As String,
    '                                 ByVal p_CUENTA_RELA_OPE_ME As String, ByVal p_DEBE_HABER As String,
    '                                 ByVal p_USUA_ID As String, ByVal p_ESTADO_IND As String, ByVal p_PROD_CODE As String) As String
    '    Dim dato As String
    '    dato = g.actualizar_sGrupoConfigContable(p_OPERACION, p_SUBGRUPO, p_CUENTA_SGRUP, p_IMPUESTO,
    '                                           p_CUENTA_IMPUESTO, p_CUENTA_OPE_MN, p_CUENTA_OPE_ME,
    '                                           p_CUENTA_RELA_OPE_MN, p_CUENTA_RELA_OPE_ME, p_DEBE_HABER, p_USUA_ID, p_ESTADO_IND, p_PROD_CODE)
    '    Return dato
    'End Function

    Public Function EliminarGrupoSubGrupo(ByVal p_CODE As String) As String
        Dim dato As String
        dato = g.eliminar_grupo(p_CODE)

        Return dato
    End Function

    Public Function ActualizarGrupo(ByVal p_grup_CODE As String, ByVal p_grup_desc As String, ByVal p_depend_code As String, _
                                 ByVal p_texi_code As String, ByVal p_estado_ind As String, ByVal p_USUA_ID As String, _
                                 ByVal p_MS_IND As String, ByVal p_MN_IND As String, ByVal p_SE_IND As String, _
                                 ByVal p_MA_IND As String, Optional ByVal p_CTLG_CODE As String = "B") As String
        Dim msg As String
        msg = g.actualizar_grupo(p_grup_CODE, p_grup_desc, p_depend_code,
                                  p_texi_code, p_estado_ind, p_USUA_ID,
                                  p_MS_IND, p_MN_IND, p_SE_IND,
                                  p_MA_IND, "", "", "", "N", String.Empty, p_CTLG_CODE)

        Return msg
    End Function

    Public Function GenerarHtmlGrupos(ByVal name As String, ByVal titulo As String, ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tbl" & name & """ cellspacing=""0""  class=""display DTTT_selectable"">"
            res += "<thead>"
            res += "<tr>"
            res += "<th colspan='5'>" & titulo.ToUpper() & "</th>"
            res += "</tr>"
            res += "<tr>"
            res += "<th align='center'>CÓDIGO</th>"
            res += "<th align='center'>DESCRIPCIÓN</th>"
            res += "<th align='center'>EXISTENCIA</th>"
            res += "<th style='display:none;' align='center'>TIP E</th>"
            res += "<th style='display:none;' align='center'>DESC E</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODIGO").ToString() & "'>"
                res += "<td align='center' id='" & dt.Rows(i)("CODIGO").ToString() & "'>" & dt.Rows(i)("CODIGO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESC_EXISTENCIA").ToString() & "</td>"
                res += "<td style='display:none;'>" & dt.Rows(i)("TIPO_EXISTENCIA").ToString() & "</td>"
                res += "<td style='display:none;'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function

    Public Function GenerarHtmlSubGrupos(ByVal name As String, ByVal titulo As String, ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tbl" & name & """ cellspacing=""0""  class=""display DTTT_selectable"">"
            res += "<thead>"
            res += "<tr>"
            res += "<th colspan='3'>" & titulo.ToUpper() & "</th>"
            res += "</tr>"
            res += "<tr>"
            res += "<th align='center'>CÓDIGO</th>"
            res += "<th align='center'>DESCRIPCIÓN</th>"
            res += "<th align='center'>ESTADO</th>"
            res += "<th style='display:none;' align='center'>CENTRO_COSTO E</th>"
            res += "<th style='display:none;' align='center'>CAB</th>"
            res += "<th style='display:none;' align='center'>DET</th>"
            res += "<th style='display:none;' align='center'>ISC_CODE</th>"
            res += "<th style='display:none;' align='center'>ISC_IND</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            'res += "<th style='display:none;' align='center'>CTA E</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODIGO").ToString() & "'>"
                res += "<td align='center' id='" & dt.Rows(i)("CODIGO").ToString() & "'>" & dt.Rows(i)("CODIGO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                res += "<td style='display:none;'>" & dt.Rows(i)("CENTRO_COSTO").ToString() & "</td>"
                res += "<td style='display:none;'>" & dt.Rows(i)("FTVGRUP_CECC").ToString() & "</td>"
                res += "<td style='display:none;'>" & dt.Rows(i)("FTVGRUP_CECD").ToString() & "</td>"
                res += "<td style='display:none;'>" & dt.Rows(i)("ISC_CODE").ToString() & "</td>"
                res += "<td style='display:none;'>" & dt.Rows(i)("ISC_IND").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_VENTA_DEBE").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_CONSUMO_HABER").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_CONSUMO_DEBE").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_COSTVENTA_HABER").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_COSTVENTA_DEBE").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_COMPRA_HABER_REL").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_COMPRA_DEBE_REL").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_VENTA_HABER_REL").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_VENTA_DEBE_REL").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_CONSUMO_HABER_REL").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_CONSUMO_DEBE_REL").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_COSTVENTA_HABER_REL").ToString() & "</td>"
                'res += "<td style='display:none;'>" & dt.Rows(i)("CUENTA_COSTVENTA_DEBE_REL").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function


    Public Function GenerarHtmlGruSubTotales(ByVal name As String, ByVal titulo As String, ByVal dt As DataTable) As String

        res = "<table id=""tbl" & name & """ cellspacing=""0""  class=""display DTTT_selectable"">"
        res += "<thead>"
        res += "<tr>"
        res += "<th colspan='4'>" & titulo.ToUpper() & "</th>"
        res += "</tr>"
        res += "<tr>"
        res += "<th align='center'>CÓDIGO</th>"
        res += "<th align='center'>DESCRIPCIÓN</th>"
        res += "<th align='center'>TIPO</th>"
        res += "<th align='center'>GRUPO</th>"
        res += "<th align='center'>CODIGO_GRUPO</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODE").ToString() & "'>"
                res += "<td  align='center'id='" & dt.Rows(i)("CODE").ToString() & "'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TIPO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("GRUPO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CODIGO_GRUPO").ToString() & "</td>"
                res += "</tr>"
            Next
        End If
        res += "</tbody>"
        res += "</table>"
        Return res
    End Function


    ''' <summary>
    ''' Elimina espacion vacios (trim), cambia (") por ('), reemplaza (/) por vacio
    ''' </summary>
    ''' <param name="campo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")

        Else
            res = campo
        End If
        Return res
    End Function

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

End Class