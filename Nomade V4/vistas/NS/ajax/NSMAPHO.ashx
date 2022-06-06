<%@ WebHandler Language="VB" Class="NSMAPHO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSMAPHO : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Dim Periodo As New Nomade.NF.NFPeriodo("Bn")
    Dim Extra As New Nomade.NS.NSExtras("Bn")
    Dim Empleado As New NOMADE.NC.NCEEmpleado("Bn")

    'Dim Extra As New Nomade.NS.
    'Dim Extra As New Nomade.NS.
    Dim resb As New StringBuilder
    Dim res As String
    Dim Codigo As String
    Dim dt As DataTable
    Dim Opcion, Empr, Sucur, Peri, USUA_ID, p_USUA_ID As String
    Dim p_Mes, p_Anio As Integer
    Dim p_RHAPRHO_CODE, p_RHAPRHO_CTLG_CODE, p_RHAPRHO_FTVSCSL_CODE, p_RHAPRHO_FCOPERI_CODE, p_RHAPRHO_FEC_PRO, p_RHAPRHO_FEC_ACT,
        p_RHAPRHO_HOR_NI, p_RHAPRHO_HOR_FIN, p_RHAPRHO_MONTO, p_RHAPRHO_MOTIVO, p_RHAPRHO_PPBIDEN_PIDM_EMP, RHAPRHO_PPBIDEN_PIDM_SOL,
        p_RHAPRHO_PPBIDEN_PIDM_AUT, p_RHAPRHO_USUA_ID, p_RHAPRHO_ESTADO_IND, p_RHAPRHO_PLAME, p_SOLICITANTE, p_VERIFICAR As String



    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Opcion = context.Request("Opcion")
        Empr = context.Request("Emp")
        Sucur = context.Request("Sucursal")
        Peri = context.Request("Peri")
        USUA_ID = context.Request("us")


        p_USUA_ID = context.User.Identity.Name
        p_RHAPRHO_CODE = context.Request("p_RHAPRHO_CODE")
        p_RHAPRHO_CTLG_CODE = context.Request("p_RHAPRHO_CTLG_CODE")
        p_RHAPRHO_FTVSCSL_CODE = context.Request("p_RHAPRHO_FTVSCSL_CODE")
        p_RHAPRHO_HOR_NI = context.Request("p_RHAPRHO_HOR_NI")
        p_RHAPRHO_HOR_FIN = context.Request("p_RHAPRHO_HOR_FIN")
        p_RHAPRHO_MOTIVO = context.Request("p_RHAPRHO_MOTIVO")
        p_RHAPRHO_USUA_ID = context.Request("p_RHAPRHO_USUA_ID")
        p_RHAPRHO_PPBIDEN_PIDM_EMP = context.Request("p_RHAPRHO_PPBIDEN_PIDM_EMP")
        p_RHAPRHO_ESTADO_IND = context.Request("p_RHAPRHO_ESTADO_IND")

        p_RHAPRHO_FEC_ACT = context.Request("p_RHAPRHO_FEC_ACT")

        p_RHAPRHO_PLAME = context.Request("p_RHAPRHO_PLAME")
        p_SOLICITANTE = context.Request("p_SOLICITANTE")
        p_VERIFICAR = context.Request("p_VERIFICAR")


        p_Mes = IIf(context.Request("p_Mes") = Nothing, 0, IIf(context.Request("p_Mes") = "", 0, context.Request("p_Mes")))
        p_Anio = IIf(context.Request("p_Anio") = Nothing, 0, IIf(context.Request("p_Anio") = "", 0, context.Request("p_Anio")))



        Try
            Select Case Opcion

                'Case "0"
                '    dt = New DataTable
                '    dt = Periodo.Listar_Periodo("", "")
                '    Dim Fecha As String = ""
                '    If Not (dt Is Nothing) Then
                '        For i = 0 To dt.Rows.Count - 1
                '            Fecha = dt.Rows(0)("CODIGO").ToString()
                '        Next

                '    End If
                '    res = Fecha
                Case "X"
                    Codigo = context.Request("Codigo")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = Extra.Listar_Hora_Extra(Codigo, String.Empty, String.Empty, String.Empty, "0", String.Empty,String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            Dim FecUno As String = MiDataRow("RHAPRHO_FEC_PRO").ToString
                            Dim FecDos As String = MiDataRow("RHAPRHO_FEC_ACT").ToString
                            Dim Estado As String = ""

                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("RHAPRHO_CODE").ToString & """,")
                            resb.Append("""COD_EMPLEADO"" :" & """" & MiDataRow("RHAPRHO_PPBIDEN_PIDM_EMP").ToString & """,")
                            resb.Append("""COD_EMPRESA"" :" & """" & MiDataRow("RHAPRHO_CTLG_CODE").ToString & """,")
                            resb.Append("""COD_SUCURSAL"" :" & """" & MiDataRow("RHAPRHO_FTVSCSL_CODE").ToString & """,")
                            resb.Append("""EMPRESA"" :" & """" & MiDataRow("EMPRESA").ToString & """,")
                            resb.Append("""EMPLEADO"" :" & """" & MiDataRow("EMP").ToString & """,")
                            resb.Append("""FECHA_PROCESO"" :" & """" & FecUno.Substring(0, 10) & """,")
                            If FecDos = "" Then
                                resb.Append("""FECHA_ACT"" :" & """" & "" & """,")
                            Else
                                resb.Append("""FECHA_ACT"" :" & """" & (Utilities.fechaLocal(FecDos.Substring(0, 10))) & """,")
                            End If
                            resb.Append("""INICIO"" :" & """" & MiDataRow("RHAPRHO_HOR_NI").ToString & """,")
                            resb.Append("""FIN"" :" & """" & MiDataRow("RHAPRHO_HOR_FIN").ToString & """,")
                            resb.Append("""MOTIVO"" :" & """" & MiDataRow("RHAPRHO_MOTIVO").ToString & """,")
                            resb.Append("""PIDM_SOL"" :" & """" & MiDataRow("RHAPRHO_PPBIDEN_PIDM_SOL").ToString & """,")
                            resb.Append("""SOLICITA"" :" & """" & MiDataRow("SOL").ToString & """,")
                            If MiDataRow("RHAPRHO_ESTADO").ToString = "S" Then
                                Estado = "Solicitado"
                            ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "A" Then
                                Estado = "Aprobado"
                            ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "R" Then
                                Estado = "Rechazado"
                            End If
                            If MiDataRow("RHAPRHO_ESTADO_IND").ToString = "I" Then
                                Estado = "Inactivo"
                            End If
                            resb.Append("""ESTADO_SOLI"" :" & """" &  MiDataRow("RHAPRHO_ESTADO_IND").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & Estado & """,")
                            resb.Append("""CORREO"" :" & """" & MiDataRow("CORREO").ToString & """,")
                            resb.Append("""CODIGO_PLAME"" :" & """" & MiDataRow("RHAPRHO_PLAME").ToString & """,")
                            resb.Append("""PLAME"" :" & """" & MiDataRow("PLAME").ToString & """,")
                            resb.Append("""AUTORIZA"" :" & """" & MiDataRow("AUT").ToString & """,")
                            resb.Append("""USUA_REG"" :" & """" & MiDataRow("RHAPRHO_USUA_ID").ToString & """")

                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")

                    End If
                    res = resb.ToString()
                Case "L"
                    dt = Empleado.Listar_Empleados_Contrato_Activo(Empr, String.Empty)
                    'dt = Empleado.Listar_Empleados("0", "0", "A", Empr, Sucur)
                    If Not dt Is Nothing Then
                        For i = 0 To dt.Rows.Count - 1
                            If i = 0 Then
                                resb.Append("<option value='" & dt.Rows(i)("PIDM").ToString() & "' selected>" & dt.Rows(i)("NOMBRE_EMPLEADO").ToString() & "</option>")
                            Else
                                resb.Append("<option value='" & dt.Rows(i)("PIDM").ToString() & "'>" & dt.Rows(i)("NOMBRE_EMPLEADO").ToString() & "</option>")
                            End If

                        Next
                    End If
                    res = resb.ToString()

                Case "ROL"
                    dt = New NOMADE.NS.NSUsuario("Bn").VerificaRolUsuario(p_USUA_ID, "0075")
                    If Not (dt Is Nothing) Then
                        For Each MiDataRow As DataRow In dt.Rows
                            res = MiDataRow("PERMISO").ToString
                        Next
                    End If


                Case "EM"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If Not dt Is Nothing Then
                        For i = 0 To dt.Rows.Count - 1
                            If i = 0 Then
                                resb.Append("<option value='" & dt.Rows(i)("codigo").ToString() & "' selected>" & dt.Rows(i)("descripcion").ToString() & "</option>")
                            Else
                                resb.Append("<option value='" & dt.Rows(i)("codigo").ToString() & "'>" & dt.Rows(i)("descripcion").ToString() & "</option>")
                            End If

                        Next
                    End If
                    res = resb.ToString()

                Case "R"
                    Dim array As String()
                    Dim TiempoUno As String
                    Dim TiempoDos As String
                    TiempoUno = Convert.ToInt16(Replace(p_RHAPRHO_HOR_NI, ":", ""))
                    TiempoDos = Convert.ToInt16(Replace(p_RHAPRHO_HOR_FIN, ":", ""))

                    Dim Fecha_Act As String

                    Fecha_Act = Utilities.fechaLocal(p_RHAPRHO_FEC_ACT)
                    Fecha_Act = Replace(Fecha_Act, "/", "-")

                    If TiempoUno < TiempoDos Then

                        Dim dtHorasExtra As DataTable
                        dtHorasExtra = Extra.Listar_Hora_Extra(String.Empty, String.Empty, "A", Fecha_Act, p_RHAPRHO_PPBIDEN_PIDM_EMP, String.Empty, String.Empty)
                        Dim HoraIniTabla As String
                        Dim HoraFinTabla As String
                        Dim NoCruce As Boolean
                        NoCruce = True
                        If Not dtHorasExtra Is Nothing Then
                            For i = 0 To dtHorasExtra.Rows.Count - 1

                                HoraIniTabla = Convert.ToInt16(Replace(dtHorasExtra.Rows(i)("RHAPRHO_HOR_NI"), ":", ""))
                                HoraFinTabla = Convert.ToInt16(Replace(dtHorasExtra.Rows(i)("RHAPRHO_HOR_FIN"), ":", ""))

                                If Convert.ToInt16(TiempoUno) = Convert.ToInt16(HoraIniTabla) And Convert.ToInt16(TiempoDos) = Convert.ToInt16(HoraFinTabla) Then
                                    NoCruce = False
                                    Exit For
                                ElseIf Convert.ToInt16(TiempoUno) >= Convert.ToInt16(HoraIniTabla) And Convert.ToInt16(TiempoUno) < Convert.ToInt16(HoraFinTabla) Then
                                    NoCruce = False
                                    Exit For
                                ElseIf Convert.ToInt16(TiempoDos) > Convert.ToInt16(HoraIniTabla) And Convert.ToInt16(TiempoDos) <= Convert.ToInt16(HoraFinTabla) Then
                                    NoCruce = False
                                    Exit For
                                End If

                            Next
                        End If


                        If NoCruce = True Then
                            array = Registrar(p_RHAPRHO_CTLG_CODE, p_RHAPRHO_FTVSCSL_CODE, String.Empty, p_RHAPRHO_FEC_ACT, p_RHAPRHO_HOR_NI, p_RHAPRHO_HOR_FIN,
                                       p_RHAPRHO_MOTIVO, p_RHAPRHO_PPBIDEN_PIDM_EMP, p_SOLICITANTE, String.Empty, p_RHAPRHO_USUA_ID, p_RHAPRHO_ESTADO_IND, p_RHAPRHO_PLAME)
                            res = array(0) & "," & array(1) & "," & array(2) & "," & array(3) & "," & array(4)
                        Else
                            res = "CRUCE"
                        End If

                    Else
                        res = "HORA"
                    End If


                Case "M"
                    Dim array As String()
                    Dim TiempoUno As String
                    Dim TiempoDos As String
                    TiempoUno = Convert.ToInt16(Replace(p_RHAPRHO_HOR_NI, ":", ""))
                    TiempoDos = Convert.ToInt16(Replace(p_RHAPRHO_HOR_FIN, ":", ""))

                    Dim Fecha_Act As String

                    Fecha_Act = Utilities.fechaLocal(p_RHAPRHO_FEC_ACT)
                    Fecha_Act = Replace(Fecha_Act, "/", "-")



                    If TiempoUno < TiempoDos Then

                        Dim dtHorasExtra As DataTable
                        dtHorasExtra = Extra.Listar_Hora_Extra(String.Empty, String.Empty, "A", Fecha_Act, p_RHAPRHO_PPBIDEN_PIDM_EMP, String.Empty, String.Empty)
                        Dim HoraIniTabla As String
                        Dim HoraFinTabla As String
                        Dim CodigoHE As String
                        Dim NoCruce As Boolean
                        NoCruce = True
                        If Not dtHorasExtra Is Nothing Then
                            For i = 0 To dtHorasExtra.Rows.Count - 1

                                HoraIniTabla = Convert.ToInt16(Replace(dtHorasExtra.Rows(i)("RHAPRHO_HOR_NI"), ":", ""))
                                HoraFinTabla = Convert.ToInt16(Replace(dtHorasExtra.Rows(i)("RHAPRHO_HOR_FIN"), ":", ""))
                                CodigoHE = dtHorasExtra.Rows(i)("RHAPRHO_CODE").ToString()

                                If p_RHAPRHO_CODE <> CodigoHE Then

                                    If Convert.ToInt16(TiempoUno) = Convert.ToInt16(HoraIniTabla) And Convert.ToInt16(TiempoDos) = Convert.ToInt16(HoraFinTabla) Then
                                        NoCruce = False
                                        Exit For
                                    ElseIf Convert.ToInt16(TiempoUno) >= Convert.ToInt16(HoraIniTabla) And Convert.ToInt16(TiempoUno) < Convert.ToInt16(HoraFinTabla) Then
                                        NoCruce = False
                                        Exit For
                                    ElseIf Convert.ToInt16(TiempoDos) > Convert.ToInt16(HoraIniTabla) And Convert.ToInt16(TiempoDos) <= Convert.ToInt16(HoraFinTabla) Then
                                        NoCruce = False
                                        Exit For
                                    End If
                                End If

                            Next
                        End If

                        If NoCruce = True Then
                            array = Modificar(p_RHAPRHO_CODE, p_RHAPRHO_FEC_ACT, p_RHAPRHO_HOR_NI, p_RHAPRHO_HOR_FIN, p_RHAPRHO_MOTIVO, p_RHAPRHO_ESTADO_IND,
                                              p_RHAPRHO_USUA_ID, String.Empty, p_RHAPRHO_PLAME, p_SOLICITANTE)
                            res = array(0) & "," & "X" & "," & array(1)
                        Else
                            res = "CRUCE"
                        End If

                    Else
                        res = "HORA"
                    End If


                Case "E"
                    Dim array As String()
                    array = AprobarRechazar(p_RHAPRHO_CODE, p_RHAPRHO_ESTADO_IND, p_RHAPRHO_USUA_ID)
                    res = array(0)
                Case "C"
                    res = "OK"
                Case "LMAILS"
                    context.Request.ContentType = "application/json; charset=utf-8"
                    Dim mail As New Nomade.Mail.NomadeMail("BN")
                    dt = mail.ListarCorreos(0, 0, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            If MiDataRow("Correo").ToString <> Nothing Then
                                resb.Append("{")
                                resb.Append("""Nombres"" :" & """" & MiDataRow("Nombres").ToString & """,")
                                resb.Append("""Usuario"" :" & """" & MiDataRow("USUARIO").ToString & """,")
                                resb.Append("""Etiqueta"" :" & """" & MiDataRow("Nombres").ToString & " [" & MiDataRow("Correo").ToString & "]" & """,")
                                resb.Append("""Correo"" :" & """" & MiDataRow("Correo").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "SENDMAIL"
                    context.Request.ContentType = "text/plain"
                    Dim mail As New Nomade.Mail.NomadeMail("BN")

                    Dim remitente As String = context.Request("REMITENTE")
                    Dim nremitente As String = context.Request("NREMITENTE")
                    Dim destinatarios As String = context.Request("DESTINATARIOS")
                    Dim asunto As String = context.Request("ASUNTO")
                    Dim mensaje As String = context.Request("MENSAJE")
                    Dim titulo As String = context.Request("TITULO")
                    Dim empresa As String = context.Request("EMPRESA")
                    Dim tipoHE As String = context.Request("TIPO_HE")
                    Dim empleado As String = context.Request("EMPLEADO")
                    Dim fechaProceso As String = context.Request("FEC_PROC")
                    Dim fechaPermiso As String = context.Request("FEC_PERM")
                    Dim horaInicio As String = context.Request("HORA_INI")
                    Dim horaFin As String = context.Request("HORA_FIN")
                    Dim periodo As String = context.Request("PERIODO")
                    Dim motivo As String = context.Request("MOTIVO")
                    Dim solicitante As String = context.Request("SOLICITANTE")
                    Dim aprobante As String = context.Request("APROBANTE")
                    Dim estado As String = context.Request("ESTADO")

                    Dim cadApro As String = ""

                    If estado = "Aprobado" Or estado = "Rechazado" Then
                        cadApro = "Aprobante:"
                    End If





                    Dim CUERPO As String =
                        "<p>" & mensaje & "</p><hr>" &
                        "<h2>" & empresa & "</h2>" &
                        "<h3>" & titulo & "</h3><br>" &
                        "<p><strong>Tipo:</strong> " & tipoHE & "</p>" &
                        "<p><strong>Empleado:</strong> " & empleado & "</p>" &
                        "<p><strong>Fecha Proceso:</strong> " & fechaProceso & "</p>" &
                        "<p><strong>Fecha Permiso:</strong> " & fechaPermiso & "</p>" &
                        "<p><strong>Hora Inicio:</strong> " & horaInicio & "&nbsp;&nbsp;&nbsp;<strong>Hora Fin:</strong> " & horaFin & "</p><br>" &
                        "<p><strong>Periodo:</strong> " & periodo & "</p>" &
                        "<p><strong>Motivo:</strong> " & motivo & "</p>" &
                        "<p><strong>Solicitante:</strong> " & solicitante & "</p>" &
                        "<p><strong>" & cadApro & "</strong> " & aprobante & "</p><br>" &
                        "<p><strong>Estado:</strong> " & estado & "</p>"


                    mail.enviar("soporte@gmail.com", nremitente, Destinatarios, asunto, CUERPO)
                    res = "OK"


                    mail = Nothing

                Case "SEND"
                    context.Request.ContentType = "text/plain"
                    Dim Destinatarios As String = ""
                    Dim Emite As String = ""
                    Dim v As String = context.Request("v")
                    Dim t As String = context.Request("t")
                    Dim rptMail As String
                    rptMail = "OK"
                    EnviarCorreo(Convert.ToBoolean(v), Destinatarios, Emite, rptMail, t)
                    res = rptMail

                Case "HTML"
                    context.Request.ContentType = "text/plain"
                    res = HTML(p_RHAPRHO_CODE)
                Case "PL"
                    dt = Extra.Listar_Plames("0105,0106,0107")
                    If Not dt Is Nothing Then
                        For i = 0 To dt.Rows.Count - 1
                            If i = 0 Then
                                resb.Append("<option value='" & dt.Rows(i)("codigo").ToString() & "' selected>" & dt.Rows(i)("descripcion").ToString() & "</option>")
                            Else
                                resb.Append("<option value='" & dt.Rows(i)("codigo").ToString() & "'>" & dt.Rows(i)("descripcion").ToString() & "</option>")
                            End If

                        Next
                    End If
                    res = resb.ToString()


                Case "FECHACORTE" 'Obtiene Fechas de Corte
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim pemp As New Nomade.NN.NNPlanilla("BN")

                    dt = pemp.Listar_periodo_corte_x_ctlg(p_RHAPRHO_CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""FECHA_INI_PERIODO"" :" & """" & MiDataRow("FECHA_INI_PERIODO").ToString & """,")
                            resb.Append("""FECHA_FIN_PERIODO"" :" & """" & MiDataRow("FECHA_FIN_PERIODO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "ESTPLA" 'Estadolanilla
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dt As New DataTable
                    Dim pemp As New Nomade.NN.NNPlanilla("BN")
                    dt = pemp.Get_Estado_Planilla(Empr, p_Mes, p_Anio)
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write(ex.Message)

        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property





    Public Function Registrar(ByVal p_RHAPRHO_CTLG_CODE As String, ByVal p_RHAPRHO_FTVSCSL_CODE As String,
                                            ByVal p_RHAPRHO_FEC_PRO As String, ByVal p_RHAPRHO_FEC_ACT As String,
                                            ByVal p_RHAPRHO_HOR_NI As String, ByVal p_RHAPRHO_HOR_FIN As String,
                                            ByVal p_RHAPRHO_MOTIVO As String, ByVal p_RHAPRHO_PPBIDEN_PIDM_EMP As String, ByVal RHAPRHO_PPBIDEN_PIDM_SOL As String,
                                            ByVal p_RHAPRHO_PPBIDEN_PIDM_AUT As String, ByVal p_RHAPRHO_USUA_ID As String,
                                            ByVal p_RHAPRHO_ESTADO_IND As String, ByVal p_RHAPRHO_PLAME As String) As String()
        Dim datos As String()
        p_RHAPRHO_FEC_ACT = IIf(p_RHAPRHO_FEC_ACT = "", "", Utilities.fechaLocal(p_RHAPRHO_FEC_ACT))
        datos = Extra.Crear_Hora_Extra(p_RHAPRHO_CTLG_CODE, p_RHAPRHO_FTVSCSL_CODE, p_RHAPRHO_FEC_PRO, p_RHAPRHO_FEC_ACT,
                                             p_RHAPRHO_HOR_NI, p_RHAPRHO_HOR_FIN, p_RHAPRHO_MOTIVO, p_RHAPRHO_PPBIDEN_PIDM_EMP, RHAPRHO_PPBIDEN_PIDM_SOL,
                                             p_RHAPRHO_PPBIDEN_PIDM_AUT, p_RHAPRHO_USUA_ID, p_RHAPRHO_ESTADO_IND, p_RHAPRHO_PLAME)
        Extra = Nothing
        Return datos

    End Function
    Public Function Modificar(ByVal p_RHAPRHO_CODE As String, ByVal p_RHAPRHO_FEC_ACT As String, ByVal p_RHAPRHO_HOR_NI As String, ByVal p_RHAPRHO_HOR_FIN As String,
                              ByVal p_RHAPRHO_MOTIVO As String, ByVal p_RHAPRHO_ESTADO_IND As String, ByVal p_RHAPRHO_USUA_ID As String,
                              ByVal p_SALIDA As String, ByVal p_RHAPRHO_PLAME As String, p_PIDM_SOLI As String) As String()
        Dim datos As String()
        p_RHAPRHO_FEC_ACT = IIf(p_RHAPRHO_FEC_ACT = "", "", Utilities.fechaLocal(p_RHAPRHO_FEC_ACT))
        datos = Extra.Editar_Hora_Extra(p_RHAPRHO_CODE, p_RHAPRHO_FEC_ACT, p_RHAPRHO_HOR_NI, p_RHAPRHO_HOR_FIN, p_RHAPRHO_MOTIVO,
                                        p_RHAPRHO_ESTADO_IND, p_RHAPRHO_USUA_ID, p_SALIDA, p_RHAPRHO_PLAME, p_PIDM_SOLI)
        Extra = Nothing
        Return datos

    End Function
    Public Function AprobarRechazar(ByVal p_RHAPRHO_CODE As String, ByVal p_RHAPRHO_ESTADO_IND As String,
                                      ByVal p_RHAPRHO_USUA_ID As String) As String()
        Dim datos As String()
        datos = Extra.Apro_Recha(p_RHAPRHO_CODE, p_RHAPRHO_ESTADO_IND, p_RHAPRHO_USUA_ID, String.Empty)
        Extra = Nothing
        Return datos

    End Function

    Private sub EnviarCorreo(ByVal bVer As Boolean, ByVal Destinatarios As String, ByVal Emite As String, ByRef RptaEmail As String, Optional t As String = "", Optional Asunto As String = "", Optional contenido As String = "")
        Dim cEmpleado As String = ""
        Dim cEmite As String = ""
        Dim Respuestas As String = ""
        dt = Extra.Listar_Hora_Extra(p_RHAPRHO_CODE, String.Empty, String.Empty, String.Empty, "0", String.Empty, String.Empty)

        If Not (dt Is Nothing) Then
            For Each MiDataRow As DataRow In dt.Rows
                If contenido <> "" Then
                    resb.Append("<tr>")
                    resb.Append("<td class='auto-style2' colspan='4'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & contenido & "</span></td>")
                    resb.Append("</tr>")
                End If

                resb.Append("<table class='auto-style1'>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style2' colspan='4'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><h2>" & MiDataRow("EMPRESA").ToString & "<h2></span></td>")
                resb.Append("</tr>")
                resb.Append("<tr>")


                Dim Tipo As String = ""
                If t = "A" Then
                    Tipo = "Aprobación"
                Else
                    Tipo = "Rechazo Solicitud"
                End If

                resb.Append("<td class='auto-style2' colspan='4'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><p><b>" & Tipo & " de hora extra" & "</b></p></span></td>")

                resb.Append("</tr>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'>&nbsp;</td>")
                resb.Append("<td class='auto-style2' colspan='3'>&nbsp;</td>")
                resb.Append("</tr>")


                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Asigna</b></span></td>")
                resb.Append("<td class='auto-style2' colspan='3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & MiDataRow("PLAME").ToString & "</span></td>")
                resb.Append("</tr>")
                resb.Append("<tr>")


                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Empleado</b></span></td>")
                resb.Append("<td class='auto-style2' colspan='3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & MiDataRow("EMP").ToString & "</span></td>")
                resb.Append("</tr>")

                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Fecha Proceso</b></span></td>")

                Dim FechaProceso As String = ""
                FechaProceso = MiDataRow("RHAPRHO_FEC_PRO").ToString
                FechaProceso = FechaProceso.Substring(0, 10)
                resb.Append("<td class='auto-style6'>" & FechaProceso & "</td>")
                Dim FechaAutoriza As String = ""

                If MiDataRow("FEC_ACT").ToString = "" Then
                    FechaAutoriza = "No Autorizada"
                Else
                    FechaAutoriza = MiDataRow("FEC_ACT").ToString
                    FechaAutoriza = FechaAutoriza.Substring(0, 10)
                End If

                resb.Append("<td class='auto-style4'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Fecha Autorizada</b></span></td>")
                resb.Append("<td>" & FechaAutoriza & "</td>")
                resb.Append("</tr>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Hora inicio</b></span></td>")
                resb.Append("<td class='auto-style6'>" & MiDataRow("RHAPRHO_HOR_NI").ToString & "</td>")
                resb.Append("<td class='auto-style4'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Hora fin</b></span></td>")
                resb.Append("<td>" & MiDataRow("RHAPRHO_HOR_FIN").ToString & "</td>")
                resb.Append("</tr>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Periodo</b></span></td>")
                resb.Append("<td class='auto-style6'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & MiDataRow("PERIODO").ToString & "</span></td>")
                resb.Append("</tr>")

                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Motivo</b></span></td>")
                resb.Append("<td class='auto-style5' colspan='3'>" & MiDataRow("RHAPRHO_MOTIVO").ToString & "</td>")
                resb.Append("</tr>")

                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Solicitante</b></span></td>")
                resb.Append("<td class='auto-style6'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & MiDataRow("SOL").ToString & "</span></td>")
                resb.Append("<td class='auto-style4'>&nbsp;</td>")
                resb.Append("<td>&nbsp;</td>")
                resb.Append("</tr>")

                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Aprobante</b></span></td>")
                resb.Append("<td class='auto-style6'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & IIf(MiDataRow("AUT").ToString = "", "NO RECEPCIONADO.", MiDataRow("AUT").ToString) & "</span></td>")
                resb.Append("<td class='auto-style4'>&nbsp;</td>")
                resb.Append("<td>&nbsp;</td>")
                resb.Append("</tr>")
                resb.Append("<tr>")

                Dim Estado As String = ""

                If MiDataRow("RHAPRHO_ESTADO").ToString = "S" Then
                    Estado = "Solicitado."
                ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "A" Then
                    Estado = "Aprobado."
                    Respuestas = "APROBACIÓN"
                ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "R" Then
                    Estado = "Rechazado."
                    Respuestas = "RECHAZO"
                End If

                If MiDataRow("RHAPRHO_ESTADO_IND").ToString = "I" Then
                    Estado = "Inactivo."
                End If

                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Proceso</b></span></td>")
                resb.Append("<td class='auto-style6'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & Estado & "</span></td>")
                resb.Append("<td class='auto-style4'>&nbsp;</td>")
                resb.Append("<td>&nbsp;</td>")
                resb.Append("</tr>")

                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'>&nbsp;</td>")
                resb.Append("<td class='auto-style6'>&nbsp;</td>")
                resb.Append("<td class='auto-style4'>&nbsp;</td>")
                resb.Append("<td>&nbsp;</td>")
                resb.Append("</tr>")
                resb.Append("</table>")


                cEmpleado = MiDataRow("EMP").ToString
                Destinatarios = MiDataRow("CORREO_EMP").ToString

                If MiDataRow("CORREO").ToString.Trim <> String.Empty Then
                    Destinatarios = Destinatarios + "," + MiDataRow("CORREO").ToString
                End If

                If MiDataRow("CORREO_AUT").ToString.Trim <> String.Empty Then
                    Destinatarios = Destinatarios + "," + MiDataRow("CORREO_AUT").ToString
                End If


                cEmite = MiDataRow("AUT").ToString

            Next

        End If
        '
        Dim mail As New Nomade.Mail.NomadeMail("BN")


        Dim CUERPO As String = ""
        CUERPO = resb.ToString()
        Emite = "soporte@orbitum.org"

        mail.enviar(Emite, cEmite, Destinatarios, Respuestas & " DE HORA EXTRA : " & cEmpleado, CUERPO)


        If Destinatarios.ToString.Trim = String.Empty Then
            RptaEmail = "NO EMAIL"
        Else
            RptaEmail = "OK"
        End If


    End Sub



    Public Function HTML(ByVal Codigo As String) As String
        Dim cRespuesta As String
        dt = Extra.Listar_Hora_Extra(Codigo, String.Empty, String.Empty, String.Empty,"0", String.Empty, String.Empty)
        If Not (dt Is Nothing) Then
            For Each MiDataRow As DataRow In dt.Rows
                resb.Append("<table class='auto-style1'>")

                resb.Append("<tr>")

                resb.Append("<td class='auto-style2' colspan='4'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><h2>" & MiDataRow("EMPRESA").ToString & "<h2></span></td>")
                resb.Append("</tr>")

                resb.Append("<tr>")


                resb.Append("<td class='auto-style2' colspan='4'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><p><b>" & "Solicitud de hora extra" & "</b></p></span></td>")

                resb.Append("</tr>")

                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'>&nbsp;</td>")
                resb.Append("<td class='auto-style2' colspan='3'>&nbsp;</td>")
                resb.Append("</tr>")



                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Asigna</b></span></td>")
                resb.Append("<td class='auto-style2' colspan='3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & MiDataRow("PLAME").ToString & "</span></td>")
                resb.Append("</tr>")
                resb.Append("<tr>")





                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Empleado</b></span></td>")
                resb.Append("<td class='auto-style2' colspan='3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & MiDataRow("EMP").ToString & "</span></td>")
                resb.Append("</tr>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Fecha Proceso</b></span></td>")
                Dim FechaProceso As String = ""
                FechaProceso = MiDataRow("RHAPRHO_FEC_PRO").ToString
                FechaProceso = FechaProceso.Substring(0, 10)
                resb.Append("<td class='auto-style6'>" & FechaProceso & "</td>")
                Dim FechaAutoriza As String = ""

                If MiDataRow("RHAPRHO_FEC_PRO").ToString = "" Then
                    FechaAutoriza = "No Autorizada"
                Else
                    FechaAutoriza = MiDataRow("RHAPRHO_FEC_PRO").ToString
                    FechaAutoriza = FechaAutoriza.Substring(0, 10)
                End If
                resb.Append("<td class='auto-style4'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Fecha Autorizada</b></span></td>")
                resb.Append("<td>" & FechaAutoriza & "</td>")
                resb.Append("</tr>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Hora inicio</b></span></td>")
                resb.Append("<td class='auto-style6'>" & MiDataRow("RHAPRHO_HOR_NI").ToString & "</td>")
                resb.Append("<td class='auto-style4'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Hora fin</b></span></td>")
                resb.Append("<td>" & MiDataRow("RHAPRHO_HOR_FIN").ToString & "</td>")
                resb.Append("</tr>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Periodo</b></span></td>")
                'resb.Append("<td class='auto-style6'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & MiDataRow("RHAPRHO_FCOPERI_CODE").ToString & "</span></td>")
                resb.Append("<td class='auto-style6'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & MiDataRow("PERIODO").ToString & "</span></td>")
                resb.Append("</tr>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Motivo</b></span></td>")
                resb.Append("<td class='auto-style5' colspan='3'>" & MiDataRow("RHAPRHO_MOTIVO").ToString & "</td>")
                resb.Append("</tr>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Solicitante</b></span></td>")
                resb.Append("<td class='auto-style6'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & MiDataRow("SOL").ToString & "</span></td>")
                resb.Append("<td class='auto-style4'>&nbsp;</td>")
                resb.Append("<td>&nbsp;</td>")
                resb.Append("</tr>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Aprobante</b></span></td>")
                resb.Append("<td class='auto-style6'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & IIf(MiDataRow("AUT").ToString = "", "NO RECEPCIONADO.", MiDataRow("AUT").ToString) & "</span></td>")
                resb.Append("<td class='auto-style4'>&nbsp;</td>")
                resb.Append("<td>&nbsp;</td>")
                resb.Append("</tr>")
                resb.Append("<tr>")
                Dim Estado As String = ""
                If MiDataRow("RHAPRHO_ESTADO").ToString = "S" Then
                    Estado = "Solicitado."
                ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "A" Then
                    Estado = "Aprobado."
                ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "R" Then
                    Estado = "Rechazado."
                End If

                If MiDataRow("RHAPRHO_ESTADO_IND").ToString = "I" Then
                    Estado = "Inactivo."
                End If
                resb.Append("<td class='auto-style3'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'><b>Proceso</b></span></td>")
                resb.Append("<td class='auto-style6'><span style='color: rgb(0, 0, 0); font-family: Arial; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 20px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; display: inline !important; float: none; background-color: rgb(255, 255, 255);'>" & Estado & "</span></td>")
                resb.Append("<td class='auto-style4'>&nbsp;</td>")
                resb.Append("<td>&nbsp;</td>")
                resb.Append("</tr>")
                resb.Append("<tr>")
                resb.Append("<td class='auto-style3'>&nbsp;</td>")
                resb.Append("<td class='auto-style6'>&nbsp;</td>")
                resb.Append("<td class='auto-style4'>&nbsp;</td>")
                resb.Append("<td>&nbsp;</td>")
                resb.Append("</tr>")
                resb.Append("</table>")
            Next

        End If

        Dim CUERPO As String = resb.ToString()

        cRespuesta = CUERPO
        Return cRespuesta

    End Function
End Class