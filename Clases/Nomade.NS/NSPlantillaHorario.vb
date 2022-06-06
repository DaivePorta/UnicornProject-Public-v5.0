Public Class NSPlantillaHorario
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
#Region "Cabecera"
    Public Function Crear_Plantilla_Horario(ByVal p_RHPLAHO_NOMBRE As String, ByVal p_RHPLAHO_ESTADO_IND As String,
                                            ByVal p_RHPLAHO_CTLG_CODE As String, ByVal p_RHPLAHO_USUA_ID As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_PLANTILLA_HORARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_NOMBRE", p_RHPLAHO_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_ESTADO_IND", p_RHPLAHO_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_CTLG_CODE", p_RHPLAHO_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_USUA_ID", p_RHPLAHO_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RHPLAHO_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Editar_Plantilla_Horario(ByVal p_RHPLAHO_CODE As String, ByVal p_RHPLAHO_NOMBRE As String,
                                               ByVal p_RHPLAHO_ESTADO_IND As String, ByVal p_RHPLAHO_USUA_ID As String,
                                               ByVal p_SALIDA As String) As String

        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_EDITAR_PLANTILLA_HORARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_CODE", p_RHPLAHO_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_NOMBRE", p_RHPLAHO_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_ESTADO_IND", p_RHPLAHO_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_USUA_ID", p_RHPLAHO_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", p_SALIDA, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Plantilla_Horario(ByVal p_RHPLAHO_CODE As String, ByVal p_RHPLAHO_CTLG_CODE As String, ByVal p_RHPLAHO_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_PLANTILLA_HORARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_CODE", p_RHPLAHO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_CTLG_CODE", p_RHPLAHO_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHPLAHO_ESTADO_IND", p_RHPLAHO_ESTADO_IND, ParameterDirection.Input, 253))
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
#Region "Detalle"
    Public Function Crear_Detalle_Plantilla_Horario(ByVal p_RHDEPL_CODE As String, ByVal p_RHDEPL_RHPLAHO_CODE As String,
                                            ByVal p_RHDEPL_SEQ As String, ByVal p_RHDEPL_HORA_INICIO As String,
                                            ByVal p_RHDEPL_HORA_FIN As String, ByVal p_RHDEPL_LUNES_IND As String,
                                            ByVal p_RHDEPL_MARTES_IND As String, ByVal p_RHDEPL_MIERCOLES_IND As String,
                                            ByVal p_RHDEPL_JUEVES_IND As String, ByVal p_RHDEPL_VIERNES_IND As String,
                                            ByVal p_RHDEPL_SABADO_IND As String, ByVal p_RHDEPL_DOMINGO_IND As String,
                                            ByVal p_RHDEPL_ESTADO_IND As String,
                                            ByVal p_RHDEPL_USUA_ID As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_DET_PLANT_HOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_RHPLAHO_CODE", p_RHDEPL_RHPLAHO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_SEQ", p_RHDEPL_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_HORA_INICIO", p_RHDEPL_HORA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_HORA_FIN", p_RHDEPL_HORA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_LUNES_IND", p_RHDEPL_LUNES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_MARTES_IND", p_RHDEPL_MARTES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_MIERCOLES_IND", p_RHDEPL_MIERCOLES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_JUEVES_IND", p_RHDEPL_JUEVES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_VIERNES_IND", p_RHDEPL_VIERNES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_SABADO_IND", p_RHDEPL_SABADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_DOMINGO_IND", p_RHDEPL_DOMINGO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_ESTADO_IND", p_RHDEPL_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_USUA_ID", p_RHDEPL_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RHDEPL_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Eliminar_Detalle_Plantilla_Horario(ByVal p_RHDEPL_CODE As String, ByVal p_SALIDA As String) As String

        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_ELIMINAR_DET_PLANT_HOR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_CODE", p_RHDEPL_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", p_SALIDA, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Detalle_Plantilla_Horario(ByVal p_RHDEPL_RHPLAHO_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_DET_PLANT_HOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_RHPLAHO_CODE", p_RHDEPL_RHPLAHO_CODE, ParameterDirection.Input, 253))
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
#Region "Horario"
    Public Function Crear_Horario_Plantilla(ByVal p_RHDEPL_RHPLAHO_CODE As String, ByVal p_PEBHOED_HOEC_CODE As String, ByVal p_SALIDA As String) As String

        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_HORARIO_PLANTILLA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHDEPL_RHPLAHO_CODE", p_RHDEPL_RHPLAHO_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBHOED_HOEC_CODE", p_PEBHOED_HOEC_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", p_SALIDA, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
#End Region
End Class
