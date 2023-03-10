<%@ WebHandler Language="VB" Class="NCMCLIR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMCLIR : Implements IHttpHandler

    Dim OPCION As String
    Dim USUA_ID As String

    Dim p_CODE, p_CTLG_CODE, p_SCSL_CODE, p_PERS_PIDM As String
    'DPORTA
    Dim p_CLASE_CLIENTE, p_ESTADO_IND_J, p_ESTADO_IND_N As String

    'PERSONA NATURAL     
    Dim APELL_PATE, APELL_MATE, NOMBRE, FECHA, AGENTE_RETEN_IND, ENTIDAD_IND,
        TINO_CODE, SEXO, ESCI_CODE, DOID_CODE, NRO, NRO_RUC, ESTADO_IND,
        PPRTELE_TIDT_CODE, OPERADOR, NUMERO, PPRCORR_TIDT_CODE, CORREO, TIPO, RUTA_PPBIMAG,
        PPBIMAG_NOMBRE_RUC, DIRECCION_N, UBIGEO As String
    'PERSONA JURÍDICA
    Dim p_PPBIDEN_APELL_PATE, p_PPBIDEN_RAZO_COME, p_PPBIDEN_ACTIVIDAD, p_PPBIDEN_CONTACTO, p_PPBIDEN_REP_LEGAL,
        p_PPBIDEN_WEB, p_PPBIDEN_AGENTE_RETEN_IND, p_PPBIDEN_FECHA_AGENTE_RETEN, p_PPBIDEN_AGENTE_PERCEP_IND, p_PPBIDEN_FECHA_AGENTE_PERCEP,
        p_PPBIDEN_RELACIONADA_IND, p_PPBIDEN_RELACIONADA_CODE, p_PPBIDEN_ENTIDAD_IND, p_PPBIDEN_TINO_CODE, p_PPBIDEN_USUA_ID, p_PPBDOID_DOID_CODE,
        p_PPBDOID_NRO, p_PPBDOID_ESTADO_IND, p_PPRTELE_TIDT_CODE, p_PPRTELE_NUMERO, p_PPRCORR_TIDT_CODE, p_PPRCORR_CORREO, p_PPBIMAG_TIPO,
        p_PPBIMAG_NOMBRE, p_INICIO_ACTIVIDAD, p_TIPO_CONTRIBUYENTE, DIRECCION_J, p_UBIGEO As String

    Dim p_TIPO_DCTO, p_NRO_DCTO As String
    Dim sCONDI_SUNAT, sESTADO_SUNAT As String

    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim ncPersona As New Nomade.NC.NCPersona("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        USUA_ID = vChar(context.Request("USUA_ID"))
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        'DATOS BUSQUEDA        
        p_TIPO_DCTO = context.Request("p_TIPO_DCTO")
        p_NRO_DCTO = context.Request("p_NRO_DCTO")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")

        p_CODE = context.Request("p_CODE")
        p_CLASE_CLIENTE = context.Request("p_CLASE_CLIENTE")

        'PERSONA NATURAL
        APELL_PATE = vChar(context.Request("APELL_PATE"))
        APELL_MATE = vChar(context.Request("APELL_MATE"))
        NOMBRE = vChar(context.Request("NOMBRE"))
        FECHA = context.Request("FECHA")
        AGENTE_RETEN_IND = "N" 'context.Request("AGENTE_RETEN_IND")
        ENTIDAD_IND = "N" ' context.Request("ENTIDAD_IND")
        TINO_CODE = "PNAT" ' context.Request("TINO_CODE")
        USUA_ID = context.Request("USUA_ID")
        SEXO = context.Request("SEXO") 'M/F
        ESCI_CODE = "0002" 'context.Request("ESCI_CODE")        
        DOID_CODE = context.Request("DOID_CODE")
        NRO = context.Request("NRO")
        NRO_RUC = "" 'context.Request("NRO_RUC")
        ESTADO_IND = "A" ' context.Request("ESTADO_IND")
        PPRTELE_TIDT_CODE = "" 'context.Request("PPRTELE_TIDT_CODE")
        OPERADOR = "" 'context.Request("OPERADOR")
        NUMERO = vChar(context.Request("NUMERO"))
        PPRCORR_TIDT_CODE = "" ' context.Request("PPRCORR_TIDT_CODE")
        CORREO = vChar(context.Request("CORREO"))
        UBIGEO = context.Request("UBIGEO")
        TIPO = "N" 'context.Request("TIPO")
        'RUTA IMAGEN
        RUTA_PPBIMAG = context.Request("RUTA_PPBIMAG")
        PPBIMAG_NOMBRE_RUC = context.Request("PPBIMAG_NOMBRE_RUC")
        DIRECCION_N = vChar(context.Request("DIRECCION_N"))

        'PERSONA JURÍDICA               
        p_PPBIDEN_APELL_PATE = vChar(context.Request("p_PPBIDEN_APELL_PATE"))
        p_PPBIDEN_RAZO_COME = vChar(context.Request("p_PPBIDEN_RAZO_COME"))
        p_PPBIDEN_ACTIVIDAD = context.Request("p_PPBIDEN_ACTIVIDAD")
        p_PPBIDEN_CONTACTO = "" 'context.Request("p_PPBIDEN_CONTACTO")
        p_PPBIDEN_REP_LEGAL = "" 'context.Request("p_PPBIDEN_REP_LEGAL")
        p_PPBIDEN_WEB = "" ' context.Request("p_PPBIDEN_WEB")
        p_PPBIDEN_AGENTE_RETEN_IND = context.Request("p_PPBIDEN_AGENTE_RETEN_IND")
        p_PPBIDEN_FECHA_AGENTE_RETEN = context.Request("p_PPBIDEN_FECHA_AGENTE_RETEN")
        p_PPBIDEN_AGENTE_PERCEP_IND = context.Request("p_PPBIDEN_AGENTE_PERCEP_IND")
        p_PPBIDEN_FECHA_AGENTE_PERCEP = context.Request("p_PPBIDEN_FECHA_AGENTE_PERCEP")
        p_PPBIDEN_RELACIONADA_IND = "N" ' context.Request("p_PPBIDEN_RELACIONADA_IND")
        p_PPBIDEN_RELACIONADA_CODE = "" 'context.Request("p_PPBIDEN_RELACIONADA_CODE")
        p_PPBIDEN_ENTIDAD_IND = "J" ' context.Request("p_PPBIDEN_ENTIDAD_IND")
        p_PPBIDEN_TINO_CODE = "PJUR" 'context.Request("p_PPBIDEN_TINO_CODE")
        p_PPBIDEN_USUA_ID = context.Request("p_PPBIDEN_USUA_ID")
        p_PPBDOID_DOID_CODE = context.Request("p_PPBDOID_DOID_CODE")
        p_PPBDOID_NRO = context.Request("p_PPBDOID_NRO")
        p_PPBDOID_ESTADO_IND = "A" ' context.Request("p_PPBDOID_ESTADO_IND")
        p_PPRTELE_TIDT_CODE = "" ' context.Request("p_PPRTELE_TIDT_CODE")
        p_PPRTELE_NUMERO = vChar(context.Request("p_PPRTELE_NUMERO"))
        p_PPRCORR_TIDT_CODE = "" ' context.Request("p_PPRCORR_TIDT_CODE")
        p_PPRCORR_CORREO = vChar(context.Request("p_PPRCORR_CORREO"))
        p_PPBIMAG_TIPO = context.Request("p_PPBIMAG_TIPO")
        p_PPBIMAG_NOMBRE = context.Request("p_PPBIMAG_NOMBRE")
        p_INICIO_ACTIVIDAD = context.Request("p_INICIO_ACTIVIDAD")
        p_UBIGEO = context.Request("p_UBIGEO")
        p_TIPO_CONTRIBUYENTE = ""
        DIRECCION_J = context.Request("DIRECCION_J")

        sCONDI_SUNAT = context.Request("sCONDI_SUNAT")
        sESTADO_SUNAT = context.Request("sESTADO_SUNAT")
        'MODIFICAR ESTADO
        p_ESTADO_IND_J = context.Request("p_ESTADO_IND_J")
        p_ESTADO_IND_N = context.Request("p_ESTADO_IND_N")
        Try

            Select Case OPCION

                Case "1" ' BUSCAR PERSONA POR DOCUMENTO DE IDENTIDAD
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncCliente.BuscarClienteRapido(If(p_PERS_PIDM Is Nothing, "", p_PERS_PIDM), If(p_CTLG_CODE Is Nothing, "", p_CTLG_CODE),
                                                       If(p_TIPO_DCTO Is Nothing, "", p_TIPO_DCTO), If(p_NRO_DCTO Is Nothing, "", p_NRO_DCTO))
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row In dt.Rows
                            resb.Append("{")
                            resb.AppendFormat("""PIDM"":""{0}"",", row("PIDM").ToString)
                            resb.AppendFormat("""RAZON_SOCIAL"":""{0}"",", row("RAZON_SOCIAL").ToString)
                            resb.AppendFormat("""NOMBRE_COMERCIAL"":""{0}"",", row("NOMBRE_COMERCIAL").ToString)
                            resb.AppendFormat("""PATERNO"":""{0}"",", row("PATERNO").ToString)
                            resb.AppendFormat("""MATERNO"":""{0}"",", row("MATERNO").ToString)
                            resb.AppendFormat("""NOMBRE"":""{0}"",", row("NOMBRE").ToString)
                            resb.AppendFormat("""ACTIVIDAD"":""{0}"",", row("ACTIVIDAD").ToString)
                            resb.AppendFormat("""INICIO_ACTIVIDAD"":""{0}"",", row("INICIO_ACTIVIDAD").ToString)
                            resb.AppendFormat("""DIRECCION"":""{0}"",", row("DIRECCION").ToString)
                            resb.AppendFormat("""TELEFONO"":""{0}"",", row("TELEFONO").ToString)
                            resb.AppendFormat("""CORREO"":""{0}"",", row("CORREO").ToString)
                            resb.AppendFormat("""RETENCION_IND"":""{0}"",", row("RETENCION_IND").ToString)
                            resb.AppendFormat("""RETENCION_DESDE"":""{0}"",", row("RETENCION_DESDE").ToString)
                            resb.AppendFormat("""PERCEPCION_IND"":""{0}"",", row("PERCEPCION_IND").ToString)
                            resb.AppendFormat("""PERCEPCION_DESDE "":""{0}"",", row("PERCEPCION_DESDE").ToString)
                            resb.AppendFormat("""NRO_DCTO"":""{0}"",", row("NRO_DCTO").ToString)
                            resb.AppendFormat("""FECNAC"":""{0}"",", row("FECNAC").ToString)
                            resb.AppendFormat("""ENTIDAD_IND"":""{0}"",", row("ENTIDAD_IND").ToString)
                            resb.AppendFormat("""GENERO"":""{0}"",", row("GENERO").ToString)
                            resb.AppendFormat("""CLIENTE_IND"":""{0}""", row("CLIENTE_IND").ToString)
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                        resb.Append("]")
                    End If
                    res = resb.ToString

                Case "1.5" ' BUSCAR PERSONA POR DOCUMENTO DE IDENTIDAD
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncCliente.BuscarClienteRapido2(If(p_PERS_PIDM Is Nothing, "", p_PERS_PIDM), If(p_CTLG_CODE Is Nothing, "", p_CTLG_CODE),
                                                       If(p_TIPO_DCTO Is Nothing, "", p_TIPO_DCTO), If(p_NRO_DCTO Is Nothing, "", p_NRO_DCTO))
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row In dt.Rows
                            resb.Append("{")
                            resb.AppendFormat("""PIDM"":""{0}"",", row("PIDM").ToString)
                            resb.AppendFormat("""RAZON_SOCIAL"":""{0}"",", row("RAZON_SOCIAL").ToString)
                            resb.AppendFormat("""NOMBRE_COMERCIAL"":""{0}"",", row("NOMBRE_COMERCIAL").ToString)
                            resb.AppendFormat("""PATERNO"":""{0}"",", row("PATERNO").ToString)
                            resb.AppendFormat("""MATERNO"":""{0}"",", row("MATERNO").ToString)
                            resb.AppendFormat("""NOMBRE"":""{0}"",", row("NOMBRE").ToString)
                            resb.AppendFormat("""ACTIVIDAD"":""{0}"",", row("ACTIVIDAD").ToString)
                            resb.AppendFormat("""INICIO_ACTIVIDAD"":""{0}"",", row("INICIO_ACTIVIDAD").ToString)
                            resb.AppendFormat("""DIRECCION"":""{0}"",", row("DIRECCION").ToString)
                            resb.AppendFormat("""TELEFONO"":""{0}"",", row("TELEFONO").ToString)
                            resb.AppendFormat("""CORREO"":""{0}"",", row("CORREO").ToString)
                            resb.AppendFormat("""RETENCION_IND"":""{0}"",", row("RETENCION_IND").ToString)
                            resb.AppendFormat("""RETENCION_DESDE"":""{0}"",", row("RETENCION_DESDE").ToString)
                            resb.AppendFormat("""PERCEPCION_IND"":""{0}"",", row("PERCEPCION_IND").ToString)
                            resb.AppendFormat("""PERCEPCION_DESDE "":""{0}"",", row("PERCEPCION_DESDE").ToString)
                            resb.AppendFormat("""NRO_DCTO"":""{0}"",", row("NRO_DCTO").ToString)
                            resb.AppendFormat("""TIPO_DOC"":""{0}"",", row("TIPO_DOC").ToString)
                            resb.AppendFormat("""DESC_DOCUMENTO"":""{0}"",", row("DESC_DOCUMENTO").ToString)
                            resb.AppendFormat("""FECNAC"":""{0}"",", row("FECNAC").ToString)
                            resb.AppendFormat("""ENTIDAD_IND"":""{0}"",", row("ENTIDAD_IND").ToString)
                            resb.AppendFormat("""GENERO"":""{0}"",", row("GENERO").ToString)
                            resb.AppendFormat("""ESTADO"":""{0}"",", row("ESTADO").ToString)
                            resb.AppendFormat("""CLIENTE_IND"":""{0}""", row("CLIENTE_IND").ToString)
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                        resb.Append("]")
                    End If
                    res = resb.ToString
                Case "2" 'REGISTRAR PERSONA NATURAL RÁPIDO
                    context.Response.ContentType = "application/json"
                    RUTA_PPBIMAG = "../../recursos/img/150x200.gif"
                    If FECHA <> String.Empty Then
                        FECHA = Utilities.fechaLocal(FECHA)
                    End If
                    PPBIMAG_NOMBRE_RUC = "../../recursos/img/150x200.gif"

                    resArray = ncPersona.crear_Persona_Natural(APELL_PATE, APELL_MATE, NOMBRE, FECHA, AGENTE_RETEN_IND, ENTIDAD_IND,
                                                       TINO_CODE, USUA_ID, SEXO, ESCI_CODE, DOID_CODE, NRO, NRO_RUC, ESTADO_IND,
                                                       PPRTELE_TIDT_CODE, OPERADOR, NUMERO, PPRCORR_TIDT_CODE, CORREO, TIPO, RUTA_PPBIMAG,
                                                       PPBIMAG_NOMBRE_RUC, String.Empty, String.Empty, String.Empty, String.Empty, sCONDI_SUNAT, sESTADO_SUNAT)

                    'CREAR DIRECCION DE PERSONA
                    Dim PIDM As String = resArray(0).ToString
                    If PIDM <> "" And PIDM <> "0" Then
                        Dim datos(1) As String
                        Dim ad As New Nomade.NC.NCEAdicionales("Bn")
                        Dim ITEMSCOUNT_DIRECCION, ITEMSDETAIL_DIRECCION, ITEMSCOUNT_DATOSBANCO, ITEMSDETAIL_DATOSBANCO,
                            ITEMSCOUNT_TELEFONOS, ITEMSDETAIL_TELEFONOS, ITEMSCOUNT_EMAILS, ITEMSDETAIL_EMAILS As String
                        ITEMSCOUNT_DIRECCION = "1"
                        ITEMSDETAIL_DIRECCION = PIDM + "|,|0|,|0006|,||,||,|NRO|,||,||,||,||,|" + UBIGEO + "|,|" + DIRECCION_N + "|,||,|A|,|" + USUA_ID + "|,|0|,|0"
                        ITEMSCOUNT_DATOSBANCO = "0"
                        ITEMSDETAIL_DATOSBANCO = ""
                        ITEMSCOUNT_TELEFONOS = "0"
                        ITEMSDETAIL_TELEFONOS = ""
                        ITEMSCOUNT_EMAILS = "0"
                        ITEMSDETAIL_EMAILS = ""

                        datos = ad.Actualizar_Adicionales(ITEMSCOUNT_DIRECCION, ITEMSDETAIL_DIRECCION, ITEMSCOUNT_DATOSBANCO,
                                                          ITEMSDETAIL_DATOSBANCO, ITEMSCOUNT_TELEFONOS, ITEMSDETAIL_TELEFONOS,
                                                          ITEMSCOUNT_EMAILS, ITEMSDETAIL_EMAILS, PIDM, USUA_ID)

                        'CREAR PERSONA COMO CLIENTE                                       
                        Dim datos2 As String
                        Dim FECHA_INI As String
                        FECHA_INI = Date.Today.ToString()
                        FECHA_INI = Utilities.fechaLocal(FECHA_INI)
                        datos2 = ncCliente.CrearCliente(PIDM, FECHA_INI, "", p_CTLG_CODE, p_CLASE_CLIENTE, "A", USUA_ID)

                    End If



                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""p_PPBIDEN_PIDM"":" & """" & resArray(0).ToString & """,")
                    resb.Append("""p_PPBIDEN_ID"":" & """" & resArray(1).ToString & """,")
                    resb.Append("""p_PPRTELE_NUM_SEQ"":" & """" & resArray(2).ToString & """,")
                    resb.Append("""p_PPRCORR_NUM_SEQ"":" & """" & resArray(3).ToString & """,")
                    resb.Append("""p_PPBIMAG_CODE"":" & """" & resArray(4).ToString & """,")
                    resb.Append("""p_MSG_RUC"":" & """" & resArray(5).ToString & """,")
                    resb.Append("""p_NOMBRE_COMPLETO"":" & """" & resArray(6).ToString & """,")
                    resb.Append("""SUCCESS"":" & """" & resArray(7).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "3" 'REGISTRAR PERSONA JURÍDICO RÁPIDO
                    context.Response.ContentType = "application/json"
                    If p_PPBIDEN_FECHA_AGENTE_RETEN <> String.Empty Then
                        p_PPBIDEN_FECHA_AGENTE_RETEN = Utilities.fechaLocal(p_PPBIDEN_FECHA_AGENTE_RETEN)
                    End If

                    If p_PPBIDEN_FECHA_AGENTE_PERCEP <> String.Empty Then
                        p_PPBIDEN_FECHA_AGENTE_PERCEP = Utilities.fechaLocal(p_PPBIDEN_FECHA_AGENTE_PERCEP)
                    End If

                    If p_INICIO_ACTIVIDAD <> String.Empty Then
                        p_INICIO_ACTIVIDAD = Utilities.fechaLocal(p_INICIO_ACTIVIDAD)
                    End If
                    p_PPBIMAG_NOMBRE = "../../recursos/img/150x200.gif"


                    resArray = ncPersona.crear_Persona_Juridica(p_PPBIDEN_APELL_PATE, p_PPBIDEN_RAZO_COME, p_PPBIDEN_ACTIVIDAD, p_PPBIDEN_CONTACTO, p_PPBIDEN_REP_LEGAL,
                                         p_PPBIDEN_WEB, p_PPBIDEN_AGENTE_RETEN_IND, p_PPBIDEN_FECHA_AGENTE_RETEN, p_PPBIDEN_AGENTE_PERCEP_IND, p_PPBIDEN_FECHA_AGENTE_PERCEP,
                                         p_PPBIDEN_RELACIONADA_IND, p_PPBIDEN_RELACIONADA_CODE, p_PPBIDEN_ENTIDAD_IND, p_PPBIDEN_TINO_CODE, p_PPBIDEN_USUA_ID, p_PPBDOID_DOID_CODE,
                                         p_PPBDOID_NRO, p_PPBDOID_ESTADO_IND, p_PPRTELE_TIDT_CODE, p_PPRTELE_NUMERO, p_PPRCORR_TIDT_CODE, p_PPRCORR_CORREO, p_PPBIMAG_TIPO, p_PPBIMAG_NOMBRE,
                                         p_INICIO_ACTIVIDAD, p_TIPO_CONTRIBUYENTE, sCONDI_SUNAT, sESTADO_SUNAT)

                    'CREAR DIRECCION DE PERSONA                    
                    Dim PIDM As String = resArray(0).ToString
                    If PIDM <> "" And PIDM <> "0" Then
                        Dim datos(1) As String
                        Dim ad As New Nomade.NC.NCEAdicionales("Bn")
                        Dim ITEMSCOUNT_DIRECCION, ITEMSDETAIL_DIRECCION, ITEMSCOUNT_DATOSBANCO, ITEMSDETAIL_DATOSBANCO,
                            ITEMSCOUNT_TELEFONOS, ITEMSDETAIL_TELEFONOS, ITEMSCOUNT_EMAILS, ITEMSDETAIL_EMAILS As String
                        ITEMSCOUNT_DIRECCION = "1"
                        ITEMSDETAIL_DIRECCION = PIDM + "|,|0|,|0006|,||,||,|NRO|,||,||,||,||,|" + p_UBIGEO + "|,|" + DIRECCION_J + "|,||,|A|,|" + p_PPBIDEN_USUA_ID + "|,|0|,|0"
                        ITEMSCOUNT_DATOSBANCO = "0"
                        ITEMSDETAIL_DATOSBANCO = ""
                        ITEMSCOUNT_TELEFONOS = "0"
                        ITEMSDETAIL_TELEFONOS = ""
                        ITEMSCOUNT_EMAILS = "0"
                        ITEMSDETAIL_EMAILS = ""

                        datos = ad.Actualizar_Adicionales(ITEMSCOUNT_DIRECCION, ITEMSDETAIL_DIRECCION, ITEMSCOUNT_DATOSBANCO,
                                                          ITEMSDETAIL_DATOSBANCO, ITEMSCOUNT_TELEFONOS, ITEMSDETAIL_TELEFONOS,
                                                          ITEMSCOUNT_EMAILS, ITEMSDETAIL_EMAILS, PIDM, p_PPBIDEN_USUA_ID)

                        'CREAR PERSONA COMO CLIENTE                                                    
                        Dim datos2 As String
                        Dim FECHA_INI As String
                        FECHA_INI = Date.Today.ToString()
                        FECHA_INI = Utilities.fechaLocal(FECHA_INI)
                        datos2 = ncCliente.CrearCliente(PIDM, FECHA_INI, "", p_CTLG_CODE, p_CLASE_CLIENTE, "A", p_PPBIDEN_USUA_ID)
                    End If


                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""p_PPBIDEN_PIDM"":" & """" & resArray(0).ToString & """,")
                    resb.Append("""p_PPBIDEN_ID"":" & """" & resArray(1).ToString & """,")
                    resb.Append("""p_PPRTELE_NUM_SEQ"":" & """" & resArray(2).ToString & """,")
                    resb.Append("""p_PPRCORR_NUM_SEQ"":" & """" & resArray(3).ToString & """,")
                    resb.Append("""p_PPBIMAG_CODE"":" & """" & resArray(4).ToString & """,")
                    resb.Append("""SUCCESS"":" & """" & resArray(5).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "RCLI"
                    context.Response.ContentType = "text/plain"
                    'CREAR PERSONA COMO CLIENTE                                       
                    Dim datos2 As String
                    Dim FECHA_INI As String
                    FECHA_INI = Date.Today.ToString()
                    FECHA_INI = Utilities.fechaLocal(FECHA_INI)
                    datos2 = ncCliente.CrearCliente(p_PERS_PIDM, FECHA_INI, "", p_CTLG_CODE, p_CLASE_CLIENTE, "A", USUA_ID)
                    res = "OK"
                    'DPORTA
                Case "MODIFICAR_PERS_JURIDICA"
                    context.Response.ContentType = "application/json"

                    resArray = ncPersona.Modificar_Estado_Persona_Juridica(p_CTLG_CODE, p_ESTADO_IND_J, p_PPBDOID_DOID_CODE, p_PPBDOID_NRO)

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"":" & """" & resArray(0).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    'DPORTA
                Case "MODIFICAR_PERS_NATURAL"
                    context.Response.ContentType = "application/json"

                    resArray = ncPersona.Modificar_Estado_Persona_Natural(p_CTLG_CODE, p_ESTADO_IND_N, DOID_CODE, NRO)

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"":" & """" & resArray(0).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case Else

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, " ")
        Else
            res = campo
        End If
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class