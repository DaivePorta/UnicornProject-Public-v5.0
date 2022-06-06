Public Class NSUsuario
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CambiarClaveUsuario(ByVal p_usua_id As String, ByVal clave_actual As String, ByVal clave_nueva As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CAMBIAR_CLAVE_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLAVE", clave_actual, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUEVACLAVE", clave_nueva, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MSG", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_MSG").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ObtenerClaveUsuario(ByVal p_usua_id As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_OBTENER_CLAVE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLAVE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_CLAVE").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CrearCodigoVerificacion(ByVal p_USUA_ID As String, ByVal p_EMAIL As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PCS_CREAR_CODIGO_VERIFICACION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CORREO", p_EMAIL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODIGO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function VerificaCodigo(ByVal p_USUA_ID As String, ByVal p_CODIGO As String) As Integer
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_VERIFICAR_CODIGO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VERIFICADO", String.Empty, ParameterDirection.Output, 253))
            dt = cn.Consulta(cmd)

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_VERIFICADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listarUsuario(ByVal p_ctlg_code As String, ByVal p_scsl_code As String, ByVal p_usua_id As String, ByVal p_estado As String, Optional ByVal p_email As String = "") As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EMAIL", p_email, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listarUsuario_Persona(ByVal p_PIDM As Integer) As DataTable
        Try

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_USUARIO_PERSONAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listarUsuarioPermiso(ByVal p_USUA_ID As String, ByVal p_CTLG_CODE As String, ByVal p_CARG_CODE As String, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_USUARIO_PERMISO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARG_CODE", p_CARG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listarUsuarioCorporativo(ByVal p_USUA_ID As String, ByVal p_CTLG_CODE As String, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_USUARIO_CORPORATIVO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listarUsuarioRol(ByVal p_USUA_ID As String, ByVal p_CTLG_CODE As String, ByVal p_CARG_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_USUARIO_PERMISO_ROL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARG_CODE", p_CARG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listarUsuarioEmpresa(ByVal p_USUA_ID As String, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_USUARIO_CORPORATIVO_EMPRESAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listarUsuarioEstablecimiento(ByVal p_USUA_ID As String, ByVal p_CTLG_CODE As String, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_USUARIO_CORPORATIVO_ESTABLECIMIENTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearUsuario(ByVal p_ID As String, ByVal p_CLAVE As String, ByVal p_PIDM As Integer,
                                 ByVal p_EMPLEADO_IND As String, ByVal p_FECHA_INICIO As String,
                                 ByVal p_FECHA_LIMITE As String,
                                 ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_EMAIL As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PCS_CREAR_USUARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_ID", p_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLAVE", p_CLAVE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EMPLEADO_IND", p_EMPLEADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_LIMITE", p_FECHA_LIMITE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EMAIL", p_EMAIL, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearUsuarioPermiso(ByVal p_USUA_ID As String, ByVal p_CTLG_CODE As String, ByVal p_CARG_CODE As String,
                                 ByVal p_ROLC_CODE As String, ByVal p_ESTADO_IND As String,
                                 ByVal p_USUA_ID_REG As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PCS_CREAR_USUARIO_PERMISO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARG_CODE", p_CARG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ROLC_CODE", DevuelveNulo(p_ROLC_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID_REG", p_USUA_ID_REG, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearUsuarioCorporativo(ByVal p_USUA_ID As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID_REG As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_USUARIO_CORPORATIVO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID_REG", p_USUA_ID_REG, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarUsuarioPermiso(ByVal p_USUA_ID As String, ByVal p_CTLG_CODE As String, ByVal p_CARG_CODE As String,
                                 ByVal p_ROLC_CODE As String, ByVal p_ESTADO_IND As String,
                                 ByVal p_USUA_ID_REG As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PCS_ACTUALIZAR_USUARIO_PERMISO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARG_CODE", p_CARG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ROLC_CODE", DevuelveNulo(p_ROLC_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID_REG", p_USUA_ID_REG, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarUsuario(ByVal p_ID As String, ByVal p_CLAVE As String,
                                      ByVal p_PIDM As Integer, ByVal p_EMPLEADO_IND As String,
                                      ByVal p_FECHA_INICIO As String, ByVal p_FECHA_LIMITE As String,
                                      ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_EMAIL As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PCS_ACTUALIZAR_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ID", p_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLAVE", p_CLAVE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EMPLEADO_IND", p_EMPLEADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_LIMITE", p_FECHA_LIMITE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EMAIL", p_EMAIL, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoUsuario(ByVal p_USUA_ID As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CAMBIAR_ESTADO_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_ESTADO_IND").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Function DevuelveNulo(ByVal p_Value As Object) As Object

        If Trim(p_Value) = String.Empty Then
            Return DBNull.Value
        Else
            Return p_Value
        End If

    End Function


    Public Function listarHorarioUsuario(ByVal p_usua_id As String, ByVal p_estado As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_HORARIO_USUARIO_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearHorarioUsuario(ByVal p_usua_id As String,
                                        ByVal p_hora_empl_ind As String,
                                        ByVal p_incluir_feriados_ind As String,
                                        ByVal p_hora_inicio As String,
                                        ByVal p_hora_fin As String,
                                        ByVal p_lunes_ind As String,
                                        ByVal p_martes_ind As String,
                                        ByVal p_miercoles_ind As String,
                                        ByVal p_jueves_ind As String,
                                        ByVal p_viernes_ind As String,
                                        ByVal p_sabado_ind As String,
                                        ByVal p_domingo_ind As String,
                                        ByVal p_zoho_code As String,
                                        ByVal p_estado_ind As String,
                                        ByVal p_usua_id_reg As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_HORARIO_USUARIO_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_EMPL_IND", p_hora_empl_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INCLUIR_FERIADOS_IND", p_incluir_feriados_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_INICIO", p_hora_inicio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_FIN", p_hora_fin, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LUNES_IND", p_lunes_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARTES_IND", p_martes_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MIERCOLES_IND", p_miercoles_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_JUEVES_IND", p_jueves_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VIERNES_IND", p_viernes_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SABADO_IND", p_sabado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOMINGO_IND", p_domingo_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ZOHO_CODE", p_zoho_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID_REG", p_usua_id_reg, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearHorarioUsuarioCempleado(ByVal p_USUA_ID As String, ByVal p_estado As String, ByVal p_ctlg_code As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_HORARIO_USUARIO_CEMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearHorarioUsuarioFeriados(ByVal p_USUA_ID As String, ByVal p_if_estado As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_HORARIO_USUARIO_FERIADOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IF_ESTADO", p_if_estado, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarUsuarioCorporativo(ByVal p_USUA_ID As String, ByVal p_SCSL_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID_REG As String, p_CTLG_CODE As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PCS_ACTUALIZAR_USUARIO_CORPORATIVO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID_REG", p_USUA_ID_REG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function EliminarHorarioUsuario(ByVal p_code As String, ByVal p_usua_id As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_ELIMINAR_HORARIO_USUARIO_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_code, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function DevuelveDatosUsuario(ByVal p_usua_id As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PGS_DAME_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'cmedina

    Public Function VerificaRolUsuario(ByVal p_usua_id As String, ByVal p_rol_code As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PGS_VERIFICAR_ROL_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ROL_CODE", p_rol_code, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Correos(ByVal p_PIDM As Integer) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_CORREOS_PERSONA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarDatosUsuario(p_usua_id As String, ByVal p_estado As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_DATOS_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarUsuarioPermisoxRol(p_CTLG_CODE As String, p_ROL_CODE As String, p_ESTADO_IND As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_USUA_PERMISOxROL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", If(p_CTLG_CODE = String.Empty, DBNull.Value, p_CTLG_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ROLC_CODE", p_ROL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", If(p_ESTADO_IND = String.Empty, DBNull.Value, p_ESTADO_IND), ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



End Class
