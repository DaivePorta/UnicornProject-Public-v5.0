Public Class NSExtras
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
#Region "Hora_Extras"
    Public Function Crear_Hora_Extra(ByVal p_RHAPRHO_CTLG_CODE As String,
                                     ByVal p_RHAPRHO_FTVSCSL_CODE As String, ByVal p_RHAPRHO_FEC_PRO As String,
                                     ByVal p_RHAPRHO_FEC_ACT As String, ByVal p_RHAPRHO_HOR_NI As String,
                                     ByVal p_RHAPRHO_HOR_FIN As String, ByVal p_RHAPRHO_MOTIVO As String,
                                     ByVal p_RHAPRHO_PPBIDEN_PIDM_EMP As String, ByVal RHAPRHO_PPBIDEN_PIDM_SOL As String,
                                     ByVal p_RHAPRHO_PPBIDEN_PIDM_AUT As String, ByVal p_RHAPRHO_USUA_ID As String,
                                     ByVal p_RHAPRHO_ESTADO_IND As String, ByVal p_RHAPRHO_PLAME As String) As String()

        Try
            Dim msg(4) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PRH_INSERTAR_APRHO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_CTLG_CODE", p_RHAPRHO_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_FTVSCSL_CODE", IIf(p_RHAPRHO_FTVSCSL_CODE = "", Nothing, p_RHAPRHO_FTVSCSL_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_FEC_PRO", IIf(p_RHAPRHO_FEC_PRO = "", Nothing, p_RHAPRHO_FEC_PRO), ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_FEC_ACT", IIf(p_RHAPRHO_FEC_ACT = "", Nothing, p_RHAPRHO_FEC_ACT), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_HOR_NI", p_RHAPRHO_HOR_NI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_HOR_FIN", p_RHAPRHO_HOR_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_MOTIVO", p_RHAPRHO_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_PPBIDEN_PIDM_EMP", p_RHAPRHO_PPBIDEN_PIDM_EMP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_PPBIDEN_PIDM_SOL", RHAPRHO_PPBIDEN_PIDM_SOL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_PPBIDEN_PIDM_AUT", IIf(p_RHAPRHO_PPBIDEN_PIDM_AUT = "", Nothing, p_RHAPRHO_PPBIDEN_PIDM_AUT), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_USUA_ID", p_RHAPRHO_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_ESTADO_IND", p_RHAPRHO_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_SOL", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CORREO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_PLAME", p_RHAPRHO_PLAME, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_RHAPRHO_CODE").Value
            msg(1) = cmd1.Parameters("@p_NOMBRE_SOL").Value
            msg(2) = cmd1.Parameters("@p_CORREO").Value
            msg(3) = Convert.ToDateTime(cmd1.Parameters("@p_RHAPRHO_FEC_PRO").Value).ToString("dd/MM/yyyy")
            msg(4) = "OK"
            Return msg


        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Editar_Hora_Extra(ByVal p_RHAPRHO_CODE As String, ByVal p_RHAPRHO_FEC_ACT As String, ByVal p_RHAPRHO_HOR_NI As String, ByVal p_RHAPRHO_HOR_FIN As String,
                                      ByVal p_RHAPRHO_MOTIVO As String, ByVal p_RHAPRHO_ESTADO_IND As String,
                                      ByVal p_RHAPRHO_USUA_ID As String, ByVal p_SALIDA As String, ByVal p_RHAPRHO_PLAME As String,
                                      p_PIDM_SOLI As String) As String()

        Try

            Dim msg(1) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PRH_ACTUALIZAR_APRHO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_CODE", p_RHAPRHO_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_FEC_ACT", p_RHAPRHO_FEC_ACT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_HOR_NI", p_RHAPRHO_HOR_NI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_HOR_FIN", p_RHAPRHO_HOR_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_MOTIVO", p_RHAPRHO_MOTIVO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_ESTADO_IND", p_RHAPRHO_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_USUA_ID", p_RHAPRHO_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", p_SALIDA, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_PLAME", p_RHAPRHO_PLAME, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_SOLI", p_PIDM_SOLI, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_SALIDA").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Hora_Extra(p_RHAPRHO_CODE As String, p_RHAPRHO_CTLG_CODE As String, p_RHAPRHO_ESTADO_IND As String,
                                      p_FECHA_ACT As String, p_PIDM As String, p_SCSL_CODE As String, p_ESTADO_SOLI As String,
                                      Optional p_MES As Integer = 0, Optional p_ANIO As Integer = 0) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PRH_LISTAR_APRHO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_CODE", p_RHAPRHO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_CTLG_CODE", p_RHAPRHO_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_ESTADO_IND", p_RHAPRHO_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_ACT", p_FECHA_ACT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_SOLI", p_ESTADO_SOLI, ParameterDirection.Input, 253))
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
    Public Function Apro_Recha(ByVal p_RHAPRHO_CODE As String, ByVal p_RHAPRHO_ESTADO_IND As String,
                                      ByVal p_RHAPRHO_USUA_ID As String, ByVal p_SALIDA As String) As String()

        Try

            Dim msg(1) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PRH_APO_REC_APRHO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_CODE", p_RHAPRHO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_ESTADO", p_RHAPRHO_ESTADO_IND, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHAPRHO_USUA_ID", p_RHAPRHO_USUA_ID, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", p_SALIDA, ParameterDirection.Output, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_SOL", p_NOMBRE_SOL, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_SALIDA").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Plames(ByVal p_ENTRADA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PRH_LISTAR_PLAME_CODIGO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTRADA", p_ENTRADA, ParameterDirection.Input, 253))
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
#End Region
End Class
