Public Class NCEmpresa
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarEmpresa(ByVal p_codigo As String, ByVal p_estado As String, ByVal p_user As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_EMPRESA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USER", p_user, ParameterDirection.Input, 253))
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

    Public Function ListarTotalEmpresa(ByVal p_codigo As String, ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_TOTAL_EMPRESA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))

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


    Public Function ActualizarEmpresa(ByVal p_codi As String, ByVal corto As String, ByVal p_usuario As String, ByVal p_direccion As String, ByVal p_activo As String,
                                      ByVal p_partida As String, ByVal p_capital As String,
                                        ByVal p_participaciones As String, ByVal p_valor As String, ByVal p_tipo_reg As String, ByVal p_tipo_reg_lab As String, ByVal cts_codex As String,
                                        ByVal p_TIPO_FIRMA As String, ByVal p_FIRMANTES_OBLIG As String,
                                        ByVal p_FIRMANTES_PIDMS As String, ByVal p_FIRMANTES_OBLIG_IND As String,
                                        ByVal P_DETALLES_MIXTO As String, p_dia_corte As String, p_tope_adelanto As String,
                                        ByVal p_bio_ind As String, ByVal p_bio_code As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_EMPRESA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CORTO", corto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRE", p_direccion, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACTI", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codi, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_PARTIDA", p_partida, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAPITAL", p_capital, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PARTICIPACIONES", p_participaciones, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_valor, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_REGIMEN_RENTA", p_tipo_reg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_REGIMEN_LAB", p_tipo_reg_lab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_CTS", cts_codex, ParameterDirection.Input, 9))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_FIRMA", p_TIPO_FIRMA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FIRMANTES_OBLIG", p_FIRMANTES_OBLIG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FIRMANTES_PIDMS", p_FIRMANTES_PIDMS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FIRMANTES_OBLIG_IND", p_FIRMANTES_OBLIG_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", P_DETALLES_MIXTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIA_CORTE", p_dia_corte, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TOPE_ADELANTO", p_tope_adelanto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BIO_IND", p_bio_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BIO_CODE", IIf(p_bio_code.Equals(""), Nothing, p_bio_code), ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CrearEmpresa(ByVal p_descripcion As String, ByVal corto As String, ByVal p_direccion As String, ByVal p_ruc As String, ByVal p_pidm As String,
                              ByVal p_activo As String, ByVal p_usuario As String, ByVal p_partida As String, ByVal p_capital As String,
                              ByVal p_participaciones As String, ByVal p_valor As String, ByVal p_tipo_reg As String, ByVal p_tipo_reg_lab As String, ByVal cts_codex As String,
                              p_dia_corte As String, p_tope_adelanto As String, p_bio_ind As String, ByVal p_bio_code As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_EMPRESA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CORTO", corto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRE", p_direccion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUC", p_ruc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACTI", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PARTIDA", p_partida, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAPITAL", p_capital, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PARTICIPACIONES", p_participaciones, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_valor, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_REGIMEN_RENTA", p_tipo_reg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_REGIMEN_LAB", p_tipo_reg_lab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_CTS", cts_codex, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIA_CORTE", p_dia_corte, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TOPE_ADELANTO", p_tope_adelanto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BIO_IND", p_bio_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BIO_CODE", IIf(p_bio_code.Equals(""), Nothing, p_bio_code), ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_CODE").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarPerJur() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_EMPRESA_PJ", CommandType.StoredProcedure)

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


    Public Function ListarEmpleadosAccionistas(ByVal p_CTLG_CODE As String, ByVal p_PIDM As String, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_EMPLEADOS_ACCIONISTAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
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

    Public Function CambiarEstadoEmpresa(ByVal p_codigo As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_EMPRESA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)



            msg = cmd1.Parameters("@p_ESTADO").Value


            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarImagenesReportes(ByVal p_CTLG_CODE As String, ByVal p_RUTA_SUPERIOR As String, ByVal p_RUTA_INFERIOR As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_IMAGENES_REPORTES_EMPRESA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUTA_SUPERIOR", p_RUTA_SUPERIOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUTA_INFERIOR", p_RUTA_INFERIOR, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ListarEmpresaDatosBasicos(p_CTLG_CODE As String, p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFG_LISTAR_EMPRESA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))

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

End Class